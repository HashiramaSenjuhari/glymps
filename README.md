# Next.js Prisma-Based Q&A Application

This application is a Next.js-based Q&A platform that integrates with a MongoDB database via Prisma ORM. It supports user authentication, sidebar functionality, and CRUD operations on questions and answers. Users can submit questions, view generated responses with YouTube links, and manage their data efficiently.

## Features

- **User Authentication**: Authenticated user sessions powered by `auth()`.
- **Dynamic Sidebar**: Collapsible sidebar state stored via cookies for user preferences.
- **Question & Answer CRUD**: Questions and answers are managed and retrieved from MongoDB.
- **Integrated YouTube Links**: Each answer can have an optional YouTube video link.
- **SSR & Hydration Handling**: Ensures smooth SSR and CSR transitions.

## Technologies Used

- **Framework**: [Next.js](https://nextjs.org/)
- **Database**: [MongoDB](https://www.mongodb.com/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Authentication**: Custom `auth` service
- **UI Components**: React components including `Avatar`, `DropdownMenu`, `Accordion`, etc.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) (version 14 or later)
- [MongoDB](https://www.mongodb.com/) (local instance or cloud-based)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   ```
