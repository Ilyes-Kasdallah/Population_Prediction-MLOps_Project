# Global Population Density Prediction - MLOps Project

## Project Overview

This project focuses on predicting global population density for future years by analyzing historical population data. The system uses a time-series forecasting model called **Prophet** by Meta (formerly Facebook) to predict future population trends and density. This tool is particularly useful for urban planning, resource management, and infrastructure development.

### Key Features:
- **Prediction of population density**: Forecasts the population density for future years based on historical data.
- **Real-time prediction**: A REST API powered by AWS Lambda and SageMaker allows real-time prediction for a given year.
- **User-friendly interface**: A React-based frontend hosted on an EC2 instance allows users to input a year and get predictions.

## Dataset

The dataset used in this project contains the following columns:

1. **Year**: Integer (ranging from 1951 to 2023).
2. **Population**: Integer (total population count).
3. **Yearly Growth %**: Float (annual percentage growth rate).
4. **Number**: Integer (population increase from the previous year).
5. **Density (Pop/km²)**: Float (population density in individuals per square kilometer).

The dataset consists of **73 records** with no missing values, providing a solid foundation for training the model.

## Model

The model used for prediction is **Prophet**, a robust time-series forecasting tool that handles seasonality, holidays, and missing data. Prophet is well-suited for predicting population trends and densities based on historical data.

The process involves:
- Training the Prophet model on historical population data (1951–2023).
- Forecasting population values for future years.
- Predicting population density by combining forecasted population with area size assumptions.

## Steps Involved

### Step 1: Data Storage (AWS S3 Bucket)
- **Purpose**: Store raw data, trained models, and other resources.
- We used AWS S3 to store historical population data, the trained model from SageMaker, and processed data.

### Step 2: Set Up SageMaker Endpoint
- **Purpose**: Train and deploy the Prophet model for real-time inference.
- We created an Amazon SageMaker Notebook (Jupyter) to:
  - Load and preprocess the dataset.
  - Train the Prophet model on historical data.
  - Deploy the trained model as a SageMaker endpoint for real-time inference.

### Step 3: Lambda Function for Data Processing
- **Purpose**: Process incoming data and interact with SageMaker.
- We set up an AWS Lambda function that receives requests via API Gateway, processes them, and passes the data to the SageMaker endpoint to retrieve predictions.
- The Lambda function returns the predicted population and density values.

### Step 4: API Gateway
- **Purpose**: Expose a REST API that interacts with the Lambda function.
- We configured AWS API Gateway to create a RESTful endpoint, which triggers the Lambda function when a request is made from the frontend (React app).
  
### Step 5: Frontend (React on EC2 Instance)
- **Purpose**: Build an interactive user interface for user input and prediction display.
- We developed a **React application** to:
  - Allow users to input a year and request predictions.
  - Make HTTP requests to the API Gateway to retrieve predictions from the Lambda function.
- The React app is hosted on an **EC2 instance** with a web server (e.g., Apache or Nginx) serving the frontend.

## Deployment

### AWS Infrastructure
- **S3 Bucket**: For storing historical data, model artifacts, and processed data.
- **Amazon SageMaker**: For training and deploying the Prophet model.
- **AWS Lambda**: For processing user input and interacting with SageMaker.
- **API Gateway**: For exposing the REST API for user interactions.
- **EC2 Instance**: For hosting the React frontend application.

### React Frontend
The frontend allows users to input a year, and the system will return the predicted population density for that year. The frontend communicates with the backend (Lambda function) via the API Gateway.

#### Screenshot:
![image](https://github.com/user-attachments/assets/fa84be30-7fa8-4590-8953-f35a275ba363)

<!-- You can add the path to the image here -->

## Installation

### React Frontend

1. Clone the repository:
   ```bash
   git clone https://github.com/Ilyes-Kasdallah/Population_Prediction-MLOps_Project.git
   cd Population_Prediction-MLOps_Project
