# brain-train


## Usage
```
cat data.ldjson | brain-train --input input,input2 --output color > network.json
```

Note that it will create a temporary file on your disk for process.stdin first
to reuse the stream for the repeated iterations.

Values for training data have to be between 0 and 1.

## TODO

Brain expects the data to be between 0 and 1. However most datasets have a wider
range of values. Maybe it would be okay to take the max and min values of a row
and scale the data to 0 and 1 between those.
Maybe this could be done by a "normalize" module.
