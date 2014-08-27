# brain-train


## Usage
```
cat data.ldjson | brain-train -input input,input2 --output color > network.json
```

Note that it will create a temporary file on your disk for process.stdin first
to reuse the stream for the repeated iterations.
