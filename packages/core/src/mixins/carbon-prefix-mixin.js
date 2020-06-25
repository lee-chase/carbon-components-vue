import { settings as carbonSettings } from 'carbon-components';

export default {
  created() {
    this.carbonPrefix = carbonSettings.prefix;
  },
  computed: {
    toClassObject() {
      // Vue form "{ 'yyy': test, 'yyy', test }"
      // Expected form "['yyy', test, 'yyy', test]"

      // 'xxx' can be a template literal however
      // In JSON Objects 'yyy' cannot be a template literal

      return pairs => {
        const obj = {};
        for (let i = 0; i < pairs.length; i += 2) {
          obj[pairs[i]] = pairs[i + 1];
        }
        return obj;
      };
    },
  },
};
