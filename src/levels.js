export default function(resources) {
  const level = name => resources[name].data;
  
  return {
    'test': level('test')
  };
};
