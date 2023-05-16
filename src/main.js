const attributes = ["STR", "DEX", "CON", "INT", "WIS", "CHA"];

attributes.forEach((attr) => {
  on(`clicked:roll_${attr}`, (_info) => {
    getAttrs([attr], (values) => {
      const score = values[attr];
      const roll = `&{template:roll_attribute} {{name=${attr}}} {{roll1=[[1d20 ]]}}`;
      startRoll(roll, (results) => {
        const total = results.results.roll1.result;
        let computed = "Failure";
        if (total < score) {
          computed = "Success";
        }

        if (total === 20) {
          computed = "Critical Failure";
        }

        if (total === 1) {
          computed = "Critical Success";
        }

        finishRoll(results.rollId, {
          roll1: computed,
        });
      });
    });
  });
});

on("clicked:roll_doom_die", (info) => {
  getAttrs(["DoomDie"], (values) => {
    const die = values.DoomDie;
    const r = `1${die}`;
    const roll = `&{template:roll_attribute} {{name=DOOM}} {{roll1=[[${r}]]}}`;

    startRoll(roll, (results) => {
      const total = results.results.roll1.result;
      let computed = "Failure! Reduce your doom die";
      if (total > 2) {
        computed = "Success! You have evaded doom";
      }

      finishRoll(results.rollId, {
        roll1: computed,
      });
    });
  });
});
