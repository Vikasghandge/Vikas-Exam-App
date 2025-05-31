CREATE TABLE students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  age INT,
  profession VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE questions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  question TEXT NOT NULL,
  option_a VARCHAR(255) NOT NULL,
  option_b VARCHAR(255) NOT NULL,
  option_c VARCHAR(255) NOT NULL,
  option_d VARCHAR(255) NOT NULL,
  correct_answer CHAR(1) NOT NULL,
  category ENUM('AWS', 'Linux', 'DevOps') NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE exams (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT,
  score INT,
  total INT,
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (student_id) REFERENCES students(id)
);

-- Insert sample questions
INSERT INTO questions (question, option_a, option_b, option_c, option_d, correct_answer, category) VALUES
('Which service is used for serverless computing in AWS?', 'EC2', 'Lambda', 'S3', 'RDS', 'B', 'AWS'),
('What command lists files in Linux?', 'cd', 'mkdir', 'ls', 'pwd', 'C', 'Linux'),
('What is the main goal of DevOps?', 'Separate development and operations', 'Automate everything', 'Improve collaboration between teams', 'Reduce costs', 'C', 'DevOps'),
('Which AWS service provides object storage?', 'EC2', 'Lambda', 'S3', 'DynamoDB', 'C', 'AWS'),
('How to change directory in Linux?', 'cd', 'ls', 'pwd', 'mkdir', 'A', 'Linux'),
('What is IaC in DevOps?', 'Infrastructure as Code', 'Internet as Connection', 'Integration as Component', 'Input as Command', 'A', 'DevOps'),
('What is the AWS VPC used for?', 'Virtual Private Cloud', 'Virtual Public Cloud', 'Virtual Processor Core', 'Virtual Private Connection', 'A', 'AWS'),
('Which command shows the current directory in Linux?', 'cd', 'ls', 'pwd', 'mkdir', 'C', 'Linux'),
('What is CI/CD in DevOps?', 'Continuous Integration/Continuous Deployment', 'Centralized Infrastructure/Cloud Deployment', 'Computer Interface/Cloud Development', 'Continuous Input/Continuous Delivery', 'A', 'DevOps'),
('What AWS service is used for databases?', 'S3', 'Lambda', 'EC2', 'RDS', 'D', 'AWS'),
('How to create a directory in Linux?', 'cd', 'ls', 'pwd', 'mkdir', 'D', 'Linux'),
('What is containerization in DevOps?', 'Virtual machines', 'Docker/Kubernetes', 'Serverless computing', 'Microservices', 'B', 'DevOps'),
('What is CloudFormation in AWS?', 'Infrastructure as Code', 'Container service', 'Serverless computing', 'Database service', 'A', 'AWS'),
('How to remove a file in Linux?', 'rm', 'rmdir', 'del', 'remove', 'A', 'Linux'),
('What is blue-green deployment?', 'A deployment strategy with zero downtime', 'A type of server', 'A cloud service', 'A monitoring tool', 'A', 'DevOps');
