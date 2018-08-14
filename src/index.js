const exparser = require('miniprogram-exparser');
const ComponentManager = require('./componentmanager');
const Component = require('./component');
const _ = require('./utils');

module.exports = {
  register(definition = {}) {
    if (!definition.name) return;

    if (ComponentManager.get(definition.name)) return;

    new ComponentManager(definition);
  },

  behavior(definition) {
    definition.is = '' + _.getId();
    definition.options = {
      lazyRegistration: true,
      publicProperties: true,
    };

    _.adjustExparserDefinition(definition);
    exparser.registerBehavior(definition);

    return definition.is;
  },

  create(name) {
    let componentManager = ComponentManager.get(name);

    if (!componentManager) return;

    return new Component(componentManager);
  },
};
