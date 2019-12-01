function shouldTransformNode(currentNode, root) {
  let current = currentNode;
  while (current !== root){
    const parentComputed = current && current.parent && current.parent.value && current.parent.value.computed;
    const parentObject = current && current.parent && current.parent.value && current.parent.value.object;

    if (parentComputed && parentObject !== current.value) {
    	return false;
    }
    
    current = current.parent;
  }
  
  return true;
}

module.exports.default = function transformer(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);
  const getFirstNode = () => root.find(j.Program).get("body", 0).node;

  // Save the comments attached to the first node
  const firstNode = getFirstNode();
  const { comments } = firstNode;

  root
    .find(j.ImportDeclaration)
    .filter(path => path.node.source.value === "idx")
    .forEach(path => j(path).remove());

  root.find(j.CallExpression).forEach(path => {
    if (path.value.callee.name !== "idx") {
      return;
    }

    const rootObject = path.value.arguments[0];

    // Narrow search to within the arrow function to avoid mutating first argument to idx
    j(path)
      .find(j.ArrowFunctionExpression)
      .find(j.MemberExpression)
      .forEach(exp => {
        // Don't transform member expressions within a computed property access
        // e.g. ignore the 'window.location' part of idx(x, _ => _[`${window.location}`])
        if (!shouldTransformNode(exp, path, ['MemberExpression', 'ArrowFunctionExpression', 'OptionalMemberExpression'])) {
          return;
        }

        // For the 'root' element add the object being accessed
        // e.g. idx(x, _.a) to idx(x, x?.a)
        if (exp.value.object.name) {
          return j(exp).replaceWith(
          	j.optionalMemberExpression(
              rootObject,
              exp.value.property,
            )
          );
        }

        // Convert every other MemberExpression to an OptionalMemberExpression
        if (exp.value.object && exp.value.property) {
          j(exp).replaceWith(
            j.optionalMemberExpression(
              exp.value.object,
              exp.value.property,
              exp.value.computed
            )
          );
        }
      });

    // Replace the idx call with its second argument
    j(path).replaceWith(path.value.arguments[1].body);
  });

  // If the first node has been modified or deleted, reattach the comments
  const firstNode2 = getFirstNode();
  if (firstNode2 !== firstNode) {
    firstNode2.comments = comments;
  }

  return root.toSource();
};
