import typing
import numpy as np

from mltu.utils.text_utils import ctc_decoder
from mltu.inferenceModel import OnnxInferenceModel

class WavToTextModel(OnnxInferenceModel):
    def __init__(self, char_list: typing.Union[str, list], *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.char_list = char_list

    def predict(self, data: np.ndarray):
        data_pred = np.expand_dims(data, axis=0)
        preds = self.model.run(None, {self.input_name: data_pred})[0]
        text = ctc_decoder(preds, self.char_list)[0]
        return text