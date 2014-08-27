# brain-train

CLI for creating [brain.js](https://github.com/harthur/brain) Neural Networks
on the commandline by piping new line delimited json into it.

Install with `npm install brain-train -g`.

## Usage
```
cat data.ldjson | brain-brain --input input,input2 --output color > network.json
```

If `--input` or `--ouput` are emitted it will use the `input` and `output` attributes
of your input JSON.

Note that it will create a temporary file on your disk for process.stdin first
to reuse the stream for the repeated iterations.

Values for training data have to be between 0 and 1.

## TODO

Brain expects the data to be between 0 and 1. However most datasets have a wider
range of values. Maybe it would be okay to take the max and min values of a row
and scale the data to 0 and 1 between those.
Maybe this could be done by a "normalize" module.

Use `argv` as options for the train stream.