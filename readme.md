# brain-train


## Usage
```
cat data.ldjson | brain-train -input input,input2 --output color > network.json
```

Note that it will create a temporary file on your disk for process.stdin first
to reuse the stream for the repeated iterations.

Values for training data have to be between 0 and 1.