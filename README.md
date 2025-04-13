# EV Platform

A web application for listing, viewing, and managing electric vehicles (EVs). Built with Next.js, TypeScript, and Tailwind CSS for the frontend, this project provides a user-friendly interface to browse and manage EV data.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
- [Running the Project](#running-the-project)
- [Future Improvements](#future-improvements)
- [Author](#author)

**Note**: If the Table of Contents links do not work in your Markdown viewer, try viewing this file on GitHub or another Markdown renderer. Some viewers may have issues with anchor links.

## Features

- **Vehicle Listing Page**: Displays a grid of vehicle cards with filtering (by brand/model and condition) and sorting (by price, range, and location) capabilities.
- **Vehicle Details Page**: Shows detailed information about a selected vehicle, including images, price, range, and more.
- **Create/Edit Vehicles**: A form to add new vehicles or edit existing ones, with dynamic image URL inputs.
- **Image Gallery**: Each vehicle card and detail page includes an image gallery with navigation arrows and a transition effect.
- **Notifications**: Displays a success notification after creating a vehicle, with options to add another or return to the main page.
- **Responsive Design**: Built with Tailwind CSS for a responsive and modern UI.
- **Error Handling**: Handles API errors with user-friendly messages.

## Prerequisites

- **Docker**: Required to run the application using Docker Compose.
- **Node.js**: Version 18 or higher (for local development without Docker).
- **npm**: Comes with Node.js, used for managing dependencies.

## Setup Instructions

### Clone the Repository

```bash
git clone git@github.com:mitramir/ev-platform.git
cd ev-platform
```

### Running the Project

From the project root, build and run the application using Docker Compose:

```bash
docker-compose up --build
```

or

```bash
docker-compose build
docker-compose up
```

## Future Improvements

- Unit Tests: Reintroduce unit tests using Jest and React Testing Library to ensure code reliability.
- Image Uploads: Implement file uploads for vehicle images instead of using URLs.
- Advanced Filtering: Add more filtering options (e.g., by price range, year, or location).
- Authentication: Add user authentication to restrict vehicle management to authorized users.
- Performance Enhancements:
  - Image Optimization: Use Next.js Image component with automatic optimization to reduce image load times and improve page performance.
  - Lazy Loading: Implement lazy loading for vehicle cards on the listing page to improve initial load time, especially for large datasets.
  - Code Splitting: Leverage Next.js dynamic imports to split code and reduce the initial bundle size, improving load performance for users.
  - Caching Strategies: Implement caching for API responses (e.g., using SWR or React Query) to reduce redundant network requests and speed up data fetching.
  - Static Site Generation (SSG): Pre-render vehicle detail pages using Next.js SSG to improve load times and SEO for frequently accessed vehicles.

## Author

This project was developed and presented by **Mitra Mirnezhad**. For inquiries or collaboration opportunities, please feel free to reach out via [email](mitra.mirnezhad@gmail.com) or [LinkedIn](https://www.linkedin.com/in/mitra-mirnezhad/).

---

_Built with passion for sustainable technology and electric vehicles._
