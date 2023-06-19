from mltu.configs import BaseModelConfigs
from model import WavToTextModel
from mltu.preprocessors import WavReader
import numpy as np

from fastapi import FastAPI, File, UploadFile
from fastapi.staticfiles import StaticFiles

configs = BaseModelConfigs.load("/home/bhavesh/Desktop/SpeechToText/Models/CRNN-01/configs.yaml")
model = WavToTextModel(model_path="/home/bhavesh/Desktop/SpeechToText/Models/CRNN-01/model.onnx", char_list=configs.vocab, force_cpu=False)

def pad_spectrogram(spectrogram):
    padded_spectrogram = np.pad(spectrogram, ((configs.max_spectrogram_length - spectrogram.shape[0], 0),(0,0)), mode="constant", constant_values=0)
    return padded_spectrogram

def get_spectrogram(wav_path):
    spectrogram = WavReader.get_spectrogram(wav_path, frame_length=configs.frame_length, frame_step=configs.frame_step, fft_length=configs.fft_length)
    return spectrogram

def predict(wav_path):
    spectrogram = get_spectrogram(wav_path)
    padded_spectrogram = pad_spectrogram(spectrogram)
    text = model.predict(padded_spectrogram)
    return text


app = FastAPI()

@app.post("/predict")
async def app_pred(file: UploadFile = File(...)):
    contents = await file.read()
    with open("temp.wav", "wb") as f:
        f.write(contents)
    text = predict("temp.wav")
    return {"text": text}

@app.put("/change_model")
async def change_model():
    pass

app.mount("/", StaticFiles(directory="static", html=True), name="index")
