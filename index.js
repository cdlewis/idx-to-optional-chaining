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

    // Narrow search to within the arrow function to avoid mutating first argument to idx
    j(path)
      .find(j.ArrowFunctionExpression)
      .find(j.MemberExpression)
      .forEach(exp => {
        if (exp.value.object.name) {
          return j(exp).replaceWith(exp.value.property);
        }

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

    j(path).replaceWith(
      j.optionalMemberExpression(
        path.value.arguments[0],
        path.value.arguments[1].body
      )
    );
  });

  // If the first node has been modified or deleted, reattach the comments
  const firstNode2 = getFirstNode();
  if (firstNode2 !== firstNode) {
    firstNode2.comments = comments;
  }

  return root.toSource();
};
