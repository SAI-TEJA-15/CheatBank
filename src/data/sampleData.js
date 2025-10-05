"use client"

/**
 * Sample cheat sheet data for demonstration purposes
 * Pre-populates the application with realistic examples
 */
export const sampleCheatSheets = [
  {
    id: "1",
    title: "React Hooks Reference",
    description: "Complete guide to React Hooks with examples and best practices",
    category: "React",
    tags: ["react", "hooks", "javascript", "frontend"],
    authorId: "demo-user-1",
    authorName: "Sarah Chen",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:30:00Z",
    views: 1250,
    likes: 89,
    downloads: 156,
    likedBy: [],
    sections: [
      {
        id: "useState",
        title: "useState Hook",
        content: `// Basic useState
const [count, setCount] = useState(0);

// useState with object
const [user, setUser] = useState({
  name: '',
  email: ''
});

// Functional update
setCount(prevCount => prevCount + 1);

// Update object state
setUser(prevUser => ({
  ...prevUser,
  name: 'John Doe'
}));`,
      },
      {
        id: "useEffect",
        title: "useEffect Hook",
        content: `// Basic useEffect
useEffect(() => {
  // Side effect code
}, []);

// With dependencies
useEffect(() => {
  fetchData();
}, [userId]);

// Cleanup function
useEffect(() => {
  const timer = setInterval(() => {
    console.log('Timer tick');
  }, 1000);
  
  return () => clearInterval(timer);
}, []);`,
      },
      {
        id: "useContext",
        title: "useContext Hook",
        content: `// Create context
const ThemeContext = createContext();

// Provider
<ThemeContext.Provider value={theme}>
  <App />
</ThemeContext.Provider>

// Consumer
const theme = useContext(ThemeContext);`,
      },
    ],
  },
  {
    id: "2",
    title: "Git Commands Cheat Sheet",
    description: "Essential Git commands for version control and collaboration",
    category: "Git",
    tags: ["git", "version-control", "commands", "development"],
    authorId: "demo-user-2",
    authorName: "Mike Johnson",
    createdAt: "2024-01-10T14:20:00Z",
    updatedAt: "2024-01-10T14:20:00Z",
    views: 2100,
    likes: 145,
    downloads: 289,
    likedBy: [],
    sections: [
      {
        id: "basic",
        title: "Basic Commands",
        content: `# Initialize repository
git init

# Clone repository
git clone <url>

# Check status
git status

# Add files
git add .
git add <filename>

# Commit changes
git commit -m "commit message"

# Push changes
git push origin main`,
      },
      {
        id: "branching",
        title: "Branching",
        content: `# Create new branch
git branch <branch-name>

# Switch to branch
git checkout <branch-name>

# Create and switch
git checkout -b <branch-name>

# List branches
git branch

# Merge branch
git merge <branch-name>

# Delete branch
git branch -d <branch-name>`,
      },
      {
        id: "remote",
        title: "Remote Operations",
        content: `# Add remote
git remote add origin <url>

# Fetch changes
git fetch origin

# Pull changes
git pull origin main

# Push to remote
git push origin <branch-name>

# View remotes
git remote -v`,
      },
    ],
  },
  {
    id: "3",
    title: "CSS Flexbox Guide",
    description: "Complete reference for CSS Flexbox layout with visual examples",
    category: "CSS",
    tags: ["css", "flexbox", "layout", "frontend", "design"],
    authorId: "demo-user-3",
    authorName: "Emma Wilson",
    createdAt: "2024-01-08T09:15:00Z",
    updatedAt: "2024-01-08T09:15:00Z",
    views: 1800,
    likes: 112,
    downloads: 203,
    likedBy: [],
    sections: [
      {
        id: "container",
        title: "Flex Container Properties",
        content: `.container {
  display: flex;
  
  /* Direction */
  flex-direction: row | row-reverse | column | column-reverse;
  
  /* Wrap */
  flex-wrap: nowrap | wrap | wrap-reverse;
  
  /* Shorthand */
  flex-flow: <flex-direction> <flex-wrap>;
  
  /* Justify content */
  justify-content: flex-start | flex-end | center | space-between | space-around | space-evenly;
  
  /* Align items */
  align-items: stretch | flex-start | flex-end | center | baseline;
  
  /* Align content */
  align-content: flex-start | flex-end | center | space-between | space-around | stretch;
}`,
      },
      {
        id: "items",
        title: "Flex Item Properties",
        content: `.item {
  /* Order */
  order: <integer>;
  
  /* Flex grow */
  flex-grow: <number>;
  
  /* Flex shrink */
  flex-shrink: <number>;
  
  /* Flex basis */
  flex-basis: <length> | auto;
  
  /* Shorthand */
  flex: <flex-grow> <flex-shrink> <flex-basis>;
  
  /* Align self */
  align-self: auto | flex-start | flex-end | center | baseline | stretch;
}`,
      },
    ],
  },
  {
    id: "4",
    title: "JavaScript ES6+ Features",
    description: "Modern JavaScript features and syntax introduced in ES6 and beyond",
    category: "JavaScript",
    tags: ["javascript", "es6", "modern-js", "syntax"],
    authorId: "demo-user-1",
    authorName: "Sarah Chen",
    createdAt: "2024-01-05T16:45:00Z",
    updatedAt: "2024-01-05T16:45:00Z",
    views: 1650,
    likes: 98,
    downloads: 178,
    likedBy: [],
    sections: [
      {
        id: "arrow-functions",
        title: "Arrow Functions",
        content: `// Traditional function
function add(a, b) {
  return a + b;
}

// Arrow function
const add = (a, b) => a + b;

// With single parameter
const square = x => x * x;

// With block body
const greet = name => {
  const message = \`Hello, \${name}!\`;
  return message;
};`,
      },
      {
        id: "destructuring",
        title: "Destructuring",
        content: `// Array destructuring
const [first, second, ...rest] = [1, 2, 3, 4, 5];

// Object destructuring
const { name, age, ...others } = person;

// With default values
const { name = 'Unknown', age = 0 } = person;

// Nested destructuring
const { address: { city, country } } = user;

// Function parameters
const greet = ({ name, age }) => {
  console.log(\`Hello \${name}, you are \${age} years old\`);
};`,
      },
      {
        id: "template-literals",
        title: "Template Literals",
        content: `// Basic template literal
const message = \`Hello, \${name}!\`;

// Multi-line strings
const html = \`
  <div>
    <h1>\${title}</h1>
    <p>\${description}</p>
  </div>
\`;

// Tagged templates
const highlight = (strings, ...values) => {
  return strings.reduce((result, string, i) => {
    return result + string + (values[i] ? \`<mark>\${values[i]}</mark>\` : '');
  }, '');
};

const text = highlight\`Search for \${term} in \${category}\`;`,
      },
    ],
  },
  {
    id: "5",
    title: "Python Data Structures",
    description: "Comprehensive guide to Python built-in data structures and their methods",
    category: "Python",
    tags: ["python", "data-structures", "programming", "reference"],
    authorId: "demo-user-4",
    authorName: "Alex Rodriguez",
    createdAt: "2024-01-03T11:30:00Z",
    updatedAt: "2024-01-03T11:30:00Z",
    views: 1420,
    likes: 76,
    downloads: 134,
    likedBy: [],
    sections: [
      {
        id: "lists",
        title: "Lists",
        content: `# Create list
my_list = [1, 2, 3, 4, 5]
empty_list = []

# Add elements
my_list.append(6)          # Add to end
my_list.insert(0, 0)       # Insert at index
my_list.extend([7, 8, 9])  # Add multiple

# Remove elements
my_list.remove(3)          # Remove first occurrence
popped = my_list.pop()     # Remove and return last
popped = my_list.pop(0)    # Remove and return at index
del my_list[1]             # Delete at index

# List comprehension
squares = [x**2 for x in range(10)]
evens = [x for x in range(20) if x % 2 == 0]`,
      },
      {
        id: "dictionaries",
        title: "Dictionaries",
        content: `# Create dictionary
my_dict = {'name': 'John', 'age': 30}
empty_dict = {}

# Access and modify
name = my_dict['name']
name = my_dict.get('name', 'Unknown')
my_dict['city'] = 'New York'

# Dictionary methods
keys = my_dict.keys()
values = my_dict.values()
items = my_dict.items()

# Dictionary comprehension
squares = {x: x**2 for x in range(5)}
filtered = {k: v for k, v in my_dict.items() if len(str(v)) > 2}`,
      },
      {
        id: "sets",
        title: "Sets",
        content: `# Create set
my_set = {1, 2, 3, 4, 5}
empty_set = set()

# Add and remove
my_set.add(6)
my_set.remove(3)    # Raises KeyError if not found
my_set.discard(3)   # No error if not found

# Set operations
set1 = {1, 2, 3}
set2 = {3, 4, 5}

union = set1 | set2           # {1, 2, 3, 4, 5}
intersection = set1 & set2    # {3}
difference = set1 - set2      # {1, 2}
symmetric_diff = set1 ^ set2  # {1, 2, 4, 5}`,
      },
    ],
  },
  {
    id: "6",
    title: "Docker Commands Reference",
    description: "Essential Docker commands for containerization and deployment",
    category: "DevOps",
    tags: ["docker", "containers", "devops", "deployment"],
    authorId: "demo-user-2",
    authorName: "Mike Johnson",
    createdAt: "2024-01-01T08:00:00Z",
    updatedAt: "2024-01-01T08:00:00Z",
    views: 1950,
    likes: 134,
    downloads: 267,
    likedBy: [],
    sections: [
      {
        id: "images",
        title: "Image Commands",
        content: `# Pull image
docker pull <image>:<tag>

# List images
docker images
docker image ls

# Build image
docker build -t <name>:<tag> .

# Remove image
docker rmi <image-id>

# Remove unused images
docker image prune

# Tag image
docker tag <source> <target>`,
      },
      {
        id: "containers",
        title: "Container Commands",
        content: `# Run container
docker run <image>
docker run -d <image>              # Detached mode
docker run -p 8080:80 <image>      # Port mapping
docker run -v /host:/container <image>  # Volume mount

# List containers
docker ps           # Running containers
docker ps -a        # All containers

# Stop/Start containers
docker stop <container-id>
docker start <container-id>
docker restart <container-id>

# Remove container
docker rm <container-id>

# Execute command in container
docker exec -it <container-id> bash`,
      },
      {
        id: "compose",
        title: "Docker Compose",
        content: `# Start services
docker-compose up
docker-compose up -d    # Detached mode

# Stop services
docker-compose down

# Build services
docker-compose build

# View logs
docker-compose logs
docker-compose logs <service>

# Scale services
docker-compose up --scale <service>=3

# Example docker-compose.yml
version: '3.8'
services:
  web:
    build: .
    ports:
      - "8080:80"
    volumes:
      - .:/app
    environment:
      - NODE_ENV=development`,
      },
    ],
  },
]
