# EV Platform

A web application for listing, viewing, and managing electric vehicles (EVs). Built with Next.js, TypeScript, and Tailwind CSS for the frontend, this project provides a user-friendly interface to browse and manage EV data.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
- [Running the Project](#running-the-project)
- [Project Structure](#project-structure)
- [Future Improvements](#future-improvements)
- [Contributing](#contributing)

## Features

- **Vehicle Listing Page**: Displays a grid of vehicle cards with filtering (by brand/model and condition) and sorting (by price, range, and location) capabilities.
- **Vehicle Details Page**: Shows detailed information about a selected vehicle, including images, price, range, and more.
- **Create/Edit Vehicles**: A form to add new vehicles or edit existing ones, with dynamic image URL inputs.
- **Image Gallery**: Each vehicle card and detail page includes an image gallery with navigation arrows and a transition effect.
- **Notifications**: Displays a success notification after creating a vehicle, with options to add another or return to the main page.
- **Responsive Design**: Built with Tailwind CSS for a responsive and modern UI.
- **Error Handling**: Handles API errors with user-friendly messages and retry options.

## Prerequisites

- **Docker**: Required to run the application using Docker Compose.
- **Node.js**: Version 18 or higher (for local development without Docker).
- **npm**: Comes with Node.js, used for managing dependencies.

## Setup Instructions

### Clone the Repository

```bash
git clone git@github.com:mitramir/ev-platform.git
cd ev-platform

docker-compose up --build
```

## Author

This project was developed and presented by **Mitra Mirnezhad**. For inquiries or collaboration opportunities, please feel free to reach out via [email](mitra.mirnezhad@gmail.com) or [LinkedIn](https://www.linkedin.com/in/mitra-mirnezhad/).

---

_Built with passion for sustainable technology and electric vehicles._
