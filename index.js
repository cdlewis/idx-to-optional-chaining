export default function transformer(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);

  root
    .find(j.ImportDeclaration)
    .filter(path => path.node.source.value === "idx")
    .forEach(path => j(path).remove());

  root.find(j.CallExpression).forEach(path => {
    if (path.value.callee.name !== "idx") {
      return;
    }

    j(path).find(j.MemberExpression).forEach(exp => {
      if (
        exp.value.object.name === "_") {
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
    })

    j(path).replaceWith(
      j.optionalMemberExpression(
        j.identifier(path.value.arguments[0].name),
        path.value.arguments[1].body
      )
    )
  });

  return root.toSource();
}

