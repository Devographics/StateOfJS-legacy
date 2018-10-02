# Getting Started

`npm install`

`gatsby develop`

# How Gatsby Works

- Any file in the `pages` directory will automatically get its own route (unless its name starts with "_").
- `.csv` and `.json` can be `import`ed and used as JSON directly. `.md` files can be `import`ed and used as React components. 

# Browse

- [http://0.0.0.0:8000/](http://0.0.0.0:8000/)

# Component Structure

- **Pages** correspond to actual URLs
- **Templates** are generic templates for a type of page
- **Blocks** are the content blocks (mostly charts) that make up a template
- **Charts** are the actual chart components
- **Elements** are other components like legends, axes, etc.