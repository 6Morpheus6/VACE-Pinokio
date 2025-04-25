module.exports = {
  run: [
    // Edit this step to customize the git repository to use
    {
      method: "shell.run",
      params: {
        message: [
          "git clone https://github.com/6Morpheus6/VACE app",
        ]
      }
    },
    // Delete this step if your project does not use torch
    {
      method: "script.start",
      params: {
        uri: "torch.js",
        params: {
          venv: "env",                // Edit this to customize the venv folder path
          path: "app",                // Edit this to customize the path to start the shell from
          // xformers: true   // uncomment this line if your project requires xformers
          triton: true   // uncomment this line if your project requires triton
          // sageattention: true   // uncomment this line if your project requires sageattention
        }
      }
    },
    // Edit this step with your custom install commands
    {
      method: "shell.run",
      params: {
        env: {
          "GIT_LFS_SKIP_SMUDGE": "1"
        },
        venv: "env",                // Edit this to customize the venv folder path
        path: "app",                // Edit this to customize the path to start the shell from
        message: [
          "uv pip install -r ../requirements.txt",
          "uv pip install wan@git+https://github.com/Wan-Video/Wan2.1",
          "uv pip install ltx-video@git+https://github.com/Lightricks/LTX-Video@ltx-video-0.9.1 sentencepiece --no-deps",
          "uv pip install -r ../annotator.txt"
        ]
      }
    },
    {
      method: "hf.download",
      params: {
        path: "app",
        "_": [ "ali-vilab/VACE-Benchmark" ],
        "exclude": '".gittatributes" "*.md"',
        "local-dir": "benchmarks",
      }
    },
    {
      method: "hf.download",
      params: {
        path: "app/models",
        "_": [ "ali-vilab/VACE-Annotators" ],
        "exclude": '".gittatributes" "*.md"',
        "local-dir": "VACE-Annotators",
      }
    },
    {
      method: "hf.download",
      params: {
        path: "app/models",
        "_": [ "ali-vilab/VACE-Wan2.1-1.3B-Preview" ],
        "exclude": '".gittatributes" "*.md" "*.txt"',
        "local-dir": "VACE-Wan2.1-1.3B-Preview",
      }
    },
    {
      method: "hf.download",
      params: {
        path: "app/models",
        "_": [ "ali-vilab/VACE-LTX-Video-0.9" ],
        "exclude": '".gittatributes" "*.md" "*.txt"',
        "local-dir": "VACE-LTX-Video-0.9",
      }
    },
  ]
}
