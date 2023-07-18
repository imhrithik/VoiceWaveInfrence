 
# VoiceWave-Inference
VoiceWave is a Speech to Text model that is trained on the LJ-Speech Dataset. It is implemented using Python.

## Dataset

The model is trained on the [LJ-Speech Dataset](https://keithito.com/LJ-Speech-Dataset/), a public domain speech dataset consisting of 13,100 short audio clips of a single speaker reading passages from 7 non-fiction books.

## Requirements

- Python 3.7 or later
- Other dependencies listed in `requirements.txt`

## Installation

1. Clone this repository
2. Install the dependencies using pip:

```bash
pip install -r requirements.txt
```

## Usage
* Step 1: Download the model from the github under the releases section.
* Step 2: Extract the model and place it in the root directory of the project.
* step 3: Run the command `uvicorn server:app --reload` in the root directory of the project.

## License
This project is licensed under the MIT License - see the LICENSE file for details.