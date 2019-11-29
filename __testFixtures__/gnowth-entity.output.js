// Examples from https://github.com/gnowth/entity

const a = props => props?.theme?.[`images_${props.name}`];

const b = (configs = {}) => props => props?.theme?.[`scale_${configs.name}`]?.[configs.index];

const c = props => props?.theme?.var_size_grid || '0.5rem';