# Sri Lanka Home Price Prediction

This project aims to predict the price of homes in Sri Lanka based on various features like the number of bedrooms, bathrooms, land size, and location. The model is deployed using Flask with a React frontend.

## Software & Tools Requirements

1. [GitHub Account](https://github.com)
2. [VS Code IDE](https://code.visualstudio.com/)
3. [Git CLI](https://git-scm.com/book/en/v2/Getting-Started-The-Command-Line)
4. [AWS Account](https://aws.amazon.com/) (for EC2 deployment)

## Setting Up the Project

### Create a Virtual Environment

To create a new environment with Python 3.8, use the following command:

```bash
conda create -p venv python==3.8
```

Activate the environment:

```bash
conda activate ./venv
```

Install Required Packages:
```bash
pip install -r requirements.txt
```

Run the Flask Server:
```bash
python server.py
```