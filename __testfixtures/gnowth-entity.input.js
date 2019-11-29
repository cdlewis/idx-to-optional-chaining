// Examples from https://github.com/gnowth/entity

const a = props => idx(props, x => x.theme[`images_${props.name}`]);

const b = (configs = {}) => props => idx(props, x => x.theme?.[`scale_${configs.name}`][configs.index]);

const c = props => idx(props, x => x.theme.var_size_grid) || '0.5rem';