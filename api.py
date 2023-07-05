import time
from flask import Flask, request
from flask_cors import CORS
import whisper
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

uploaded_file_name = None

def add_newlines(string):
    new_string = ""
    for i, char in enumerate(string):
        if char.isspace() and i < len(string) - 1 and string[i+1].isupper():
            new_string += "\n"
        new_string += char
    return new_string

@app.route('/execute', methods=['POST'])
def execute_script():
    message = "Received request to execute the script"
    print(message)  # Print the message in the Flask API console

    if uploaded_file_name is None:
        return 'No file uploaded', 400

    time.sleep(5)  # Simulating a long-running process

    # Return the result of the script execution along with the message
    # return jsonify({'result': 'Script executed successfully', 'message': message})
    # ! pip install git+https://github.com/openai/whisper.git -q

    model = whisper.load_model("base")

    result = model.transcribe(uploaded_file_name, fp16=False)
    return add_newlines(result['text'])


@app.route('/upload', methods=['POST'])
def upload_file():
    global uploaded_file_name  # Use the global variable

    if 'file' not in request.files:
        return 'No file provided', 400

    file = request.files['file']

    if file.filename == '':
        return 'No file selected', 400

    # Define the folder where you want to save the uploaded files
    upload_folder = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'music')

    # Create the upload folder if it doesn't exist
    if not os.path.exists(upload_folder):
        os.makedirs(upload_folder)

    # Save the file to the upload folder
    file_path = os.path.join(upload_folder, file.filename)
    file.save(file_path)
    uploaded_file_name = 'music/' + file.filename  # Update the global variable
    print("Uploaded file name in the upload function:", uploaded_file_name)

    return 'File uploaded successfully'

if __name__ == '__main__':
    app.run()
