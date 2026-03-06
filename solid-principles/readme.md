# SOLID Principles in JavaScript and React

## Introduction

SOLID is an acronym for five design principles that make software designs more understandable, flexible, and maintainable. These principles were introduced by Robert C. Martin (Uncle Bob) and are fundamental to object-oriented design and programming.

## Table of Contents

1. [Single Responsibility Principle (SRP)](#1-single-responsibility-principle-srp)
2. [Open/Closed Principle (OCP)](#2-openclosed-principle-ocp)
3. [Liskov Substitution Principle (LSP)](#3-liskov-substitution-principle-lsp)
4. [Interface Segregation Principle (ISP)](#4-interface-segregation-principle-isp)
5. [Dependency Inversion Principle (DIP)](#5-dependency-inversion-principle-dip)

---

## 1. Single Responsibility Principle (SRP)

### Definition
**"A class/module/function should have only one reason to change."**

Each module or class should have responsibility over a single part of the functionality, and that responsibility should be entirely encapsulated by the class.

### Why It Matters
- Easier to understand and maintain
- Reduces coupling between components
- Makes testing simpler
- Changes in one responsibility don't affect others

### ❌ Bad Example (JavaScript)

```javascript
// This class does too many things
class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
  
  // User data management
  getUserInfo() {
    return `${this.name} - ${this.email}`;
  }
  
  // Database operations
  saveToDatabase() {
    console.log('Saving to database...');
    // database logic
  }
  
  // Email operations
  sendWelcomeEmail() {
    console.log(`Sending email to ${this.email}`);
    // email logic
  }
  
  // Logging
  logActivity() {
    console.log(`User ${this.name} performed an action`);
    // logging logic
  }
}
```

### ✅ Good Example (JavaScript)

```javascript
// Each class has a single responsibility

class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
  
  getUserInfo() {
    return `${this.name} - ${this.email}`;
  }
}

class UserRepository {
  save(user) {
    console.log('Saving to database...');
    // database logic
  }
  
  findById(id) {
    // fetch logic
  }
}

class EmailService {
  sendWelcomeEmail(email) {
    console.log(`Sending email to ${email}`);
    // email logic
  }
}

class Logger {
  log(message) {
    console.log(message);
    // logging logic
  }
}
```

### ❌ Bad Example (React)

```jsx
// This component does too much
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // Data fetching
    setLoading(true);
    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  }, [userId]);
  
  // Data validation
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  
  // Analytics
  const trackProfileView = () => {
    console.log('Profile viewed');
    // tracking logic
  };
  
  // Rendering and styling logic
  return (
    <div style={{ padding: '20px', backgroundColor: '#f0f0f0' }}>
      {loading && <div>Loading...</div>}
      {error && <div style={{ color: 'red' }}>Error: {error.message}</div>}
      {user && (
        <div>
          <h1>{user.name}</h1>
          <p>{validateEmail(user.email) ? user.email : 'Invalid email'}</p>
          <button onClick={trackProfileView}>View Details</button>
        </div>
      )}
    </div>
  );
}
```

### ✅ Good Example (React)

```jsx
// Custom hook for data fetching
function useUser(userId) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    setLoading(true);
    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  }, [userId]);
  
  return { user, loading, error };
}

// Utility function for validation
const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// Analytics service
const analytics = {
  trackProfileView: (userId) => {
    console.log(`Profile viewed: ${userId}`);
  }
};

// Presentation components
function LoadingSpinner() {
  return <div>Loading...</div>;
}

function ErrorMessage({ message }) {
  return <div style={{ color: 'red' }}>Error: {message}</div>;
}

function UserInfo({ user }) {
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{validateEmail(user.email) ? user.email : 'Invalid email'}</p>
    </div>
  );
}

// Main component with single responsibility: composition
function UserProfile({ userId }) {
  const { user, loading, error } = useUser(userId);
  
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!user) return null;
  
  return (
    <div style={{ padding: '20px', backgroundColor: '#f0f0f0' }}>
      <UserInfo user={user} />
      <button onClick={() => analytics.trackProfileView(userId)}>
        View Details
      </button>
    </div>
  );
}
```

---

## 2. Open/Closed Principle (OCP)

### Definition
**"Software entities should be open for extension but closed for modification."**

You should be able to add new functionality without changing existing code.

### Why It Matters
- Reduces risk of breaking existing functionality
- Promotes code reusability
- Makes code more maintainable and scalable

### ❌ Bad Example (JavaScript)

```javascript
class PaymentProcessor {
  processPayment(amount, type) {
    if (type === 'credit-card') {
      console.log(`Processing credit card payment of $${amount}`);
      // credit card logic
    } else if (type === 'paypal') {
      console.log(`Processing PayPal payment of $${amount}`);
      // PayPal logic
    } else if (type === 'bitcoin') {
      console.log(`Processing Bitcoin payment of $${amount}`);
      // Bitcoin logic
    }
    // Every new payment method requires modifying this class
  }
}
```

### ✅ Good Example (JavaScript)

```javascript
// Base payment interface
class PaymentMethod {
  process(amount) {
    throw new Error('process() must be implemented');
  }
}

// Specific implementations
class CreditCardPayment extends PaymentMethod {
  process(amount) {
    console.log(`Processing credit card payment of $${amount}`);
    // credit card logic
  }
}

class PayPalPayment extends PaymentMethod {
  process(amount) {
    console.log(`Processing PayPal payment of $${amount}`);
    // PayPal logic
  }
}

class BitcoinPayment extends PaymentMethod {
  process(amount) {
    console.log(`Processing Bitcoin payment of $${amount}`);
    // Bitcoin logic
  }
}

// Processor is closed for modification, open for extension
class PaymentProcessor {
  constructor(paymentMethod) {
    this.paymentMethod = paymentMethod;
  }
  
  processPayment(amount) {
    this.paymentMethod.process(amount);
  }
}

// Usage
const processor = new PaymentProcessor(new CreditCardPayment());
processor.processPayment(100);

// Adding new payment method doesn't require modifying existing code
class ApplePayPayment extends PaymentMethod {
  process(amount) {
    console.log(`Processing Apple Pay payment of $${amount}`);
  }
}
```

### ❌ Bad Example (React)

```jsx
// Button component that needs modification for every new style
function Button({ type, onClick, children }) {
  let style = {};
  
  if (type === 'primary') {
    style = { backgroundColor: 'blue', color: 'white' };
  } else if (type === 'secondary') {
    style = { backgroundColor: 'gray', color: 'white' };
  } else if (type === 'danger') {
    style = { backgroundColor: 'red', color: 'white' };
  }
  // Need to modify this for every new button type
  
  return (
    <button style={style} onClick={onClick}>
      {children}
    </button>
  );
}
```

### ✅ Good Example (React)

```jsx
// Base button component (closed for modification)
function Button({ className, onClick, children, style }) {
  return (
    <button className={className} style={style} onClick={onClick}>
      {children}
    </button>
  );
}

// Extensions (open for extension)
function PrimaryButton({ onClick, children }) {
  return (
    <Button 
      style={{ backgroundColor: 'blue', color: 'white' }}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

function SecondaryButton({ onClick, children }) {
  return (
    <Button 
      style={{ backgroundColor: 'gray', color: 'white' }}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

function DangerButton({ onClick, children }) {
  return (
    <Button 
      style={{ backgroundColor: 'red', color: 'white' }}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

// Can easily add new button types without modifying base Button
function SuccessButton({ onClick, children }) {
  return (
    <Button 
      style={{ backgroundColor: 'green', color: 'white' }}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

// Even better: use composition with HOC or render props
const withButtonStyle = (Component, style) => {
  return (props) => <Component {...props} style={style} />;
};

const PrimaryButton = withButtonStyle(Button, { 
  backgroundColor: 'blue', 
  color: 'white' 
});
```

---

## 3. Liskov Substitution Principle (LSP)

### Definition
**"Objects of a superclass should be replaceable with objects of a subclass without breaking the application."**

Derived classes must be substitutable for their base classes without altering the correctness of the program.

### Why It Matters
- Ensures that inheritance is used correctly
- Prevents unexpected behavior in polymorphism
- Makes code more reliable and predictable

### ❌ Bad Example (JavaScript)

```javascript
class Bird {
  fly() {
    console.log('Flying...');
  }
}

class Sparrow extends Bird {
  fly() {
    console.log('Sparrow flying...');
  }
}

class Penguin extends Bird {
  fly() {
    // Penguins can't fly! This breaks LSP
    throw new Error("Penguins can't fly!");
  }
}

// This code works for some birds but breaks for others
function makeBirdFly(bird) {
  bird.fly(); // Will throw error for Penguin
}

makeBirdFly(new Sparrow()); // Works
makeBirdFly(new Penguin()); // Breaks!
```

### ✅ Good Example (JavaScript)

```javascript
class Bird {
  move() {
    console.log('Moving...');
  }
}

class FlyingBird extends Bird {
  fly() {
    console.log('Flying...');
  }
  
  move() {
    this.fly();
  }
}

class Sparrow extends FlyingBird {
  fly() {
    console.log('Sparrow flying...');
  }
}

class Penguin extends Bird {
  swim() {
    console.log('Penguin swimming...');
  }
  
  move() {
    this.swim();
  }
}

// This works for all birds
function makeBirdMove(bird) {
  bird.move(); // Works for all bird types
}

makeBirdMove(new Sparrow()); // Sparrow flying...
makeBirdMove(new Penguin()); // Penguin swimming...
```

### ❌ Bad Example (React)

```jsx
// Base input component
function Input({ value, onChange, placeholder }) {
  return (
    <input 
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
}

// This "extends" Input but breaks the expected behavior
function ReadOnlyInput({ value, placeholder }) {
  // onChange is required by parent but ignored here - breaks LSP
  return (
    <input 
      type="text"
      value={value}
      placeholder={placeholder}
      readOnly
      // No onChange handler - components expecting Input behavior will break
    />
  );
}

// This breaks when we try to use ReadOnlyInput in place of Input
function FormField({ InputComponent, value, onChange, label }) {
  return (
    <div>
      <label>{label}</label>
      <InputComponent 
        value={value} 
        onChange={onChange} // ReadOnlyInput ignores this
      />
    </div>
  );
}
```

### ✅ Good Example (React)

```jsx
// Base component with optional onChange
function Input({ value, onChange, placeholder, readOnly = false }) {
  return (
    <input 
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      readOnly={readOnly}
    />
  );
}

// Specific implementations that maintain the contract
function EditableInput(props) {
  return <Input {...props} readOnly={false} />;
}

function ReadOnlyInput(props) {
  // Maintains the same interface but with readOnly behavior
  return <Input {...props} readOnly={true} onChange={undefined} />;
}

// This works with any input type
function FormField({ InputComponent, value, onChange, label, readOnly }) {
  return (
    <div>
      <label>{label}</label>
      <InputComponent 
        value={value} 
        onChange={readOnly ? undefined : onChange}
        readOnly={readOnly}
      />
    </div>
  );
}

// Better approach: use composition
function FormField({ value, onChange, label, readOnly }) {
  return (
    <div>
      <label>{label}</label>
      <Input 
        value={value} 
        onChange={onChange}
        readOnly={readOnly}
      />
    </div>
  );
}
```

---

## 4. Interface Segregation Principle (ISP)

### Definition
**"No client should be forced to depend on methods it does not use."**

Many specific interfaces are better than one general-purpose interface. Break down interfaces into smaller, more specific ones.

### Why It Matters
- Prevents fat interfaces
- Reduces coupling
- Makes code more flexible and easier to refactor
- Improves code readability

### ❌ Bad Example (JavaScript)

```javascript
// Fat interface that forces clients to implement methods they don't need
class Worker {
  work() {
    throw new Error('Must implement work()');
  }
  
  eat() {
    throw new Error('Must implement eat()');
  }
  
  sleep() {
    throw new Error('Must implement sleep()');
  }
}

class HumanWorker extends Worker {
  work() {
    console.log('Human working...');
  }
  
  eat() {
    console.log('Human eating...');
  }
  
  sleep() {
    console.log('Human sleeping...');
  }
}

class RobotWorker extends Worker {
  work() {
    console.log('Robot working...');
  }
  
  eat() {
    // Robots don't eat! But we're forced to implement this
    throw new Error("Robots don't eat");
  }
  
  sleep() {
    // Robots don't sleep! But we're forced to implement this
    throw new Error("Robots don't sleep");
  }
}
```

### ✅ Good Example (JavaScript)

```javascript
// Segregated interfaces
class Workable {
  work() {
    throw new Error('Must implement work()');
  }
}

class Eatable {
  eat() {
    throw new Error('Must implement eat()');
  }
}

class Sleepable {
  sleep() {
    throw new Error('Must implement sleep()');
  }
}

// Classes implement only what they need
class HumanWorker extends Workable {
  constructor() {
    super();
    this.eatable = new Eatable();
    this.sleepable = new Sleepable();
  }
  
  work() {
    console.log('Human working...');
  }
  
  eat() {
    console.log('Human eating...');
  }
  
  sleep() {
    console.log('Human sleeping...');
  }
}

class RobotWorker extends Workable {
  work() {
    console.log('Robot working...');
  }
  // No eat() or sleep() - not forced to implement them
}

// Better with composition
const workBehavior = {
  work() {
    console.log(`${this.name} working...`);
  }
};

const eatBehavior = {
  eat() {
    console.log(`${this.name} eating...`);
  }
};

const sleepBehavior = {
  sleep() {
    console.log(`${this.name} sleeping...`);
  }
};

const createHumanWorker = (name) => {
  return {
    name,
    ...workBehavior,
    ...eatBehavior,
    ...sleepBehavior
  };
};

const createRobotWorker = (name) => {
  return {
    name,
    ...workBehavior
  };
};
```

### ❌ Bad Example (React)

```jsx
// Fat props interface
function MediaPlayer({ 
  src, 
  onPlay, 
  onPause, 
  onStop,
  onVolumeChange,
  onSeek,
  onPlaybackRateChange,
  onSubtitleChange,
  showControls,
  autoPlay,
  loop,
  // ... many more props
}) {
  // Complex component with all possible features
  return <div>{/* Complex implementation */}</div>;
}

// Simple use case forced to deal with complex interface
function SimpleAudioPlayer() {
  return (
    <MediaPlayer 
      src="audio.mp3"
      onPlay={() => {}}
      onPause={null}  // Don't need but must specify
      onStop={null}   // Don't need but must specify
      onVolumeChange={null}
      onSeek={null}
      onPlaybackRateChange={null}
      onSubtitleChange={null}  // Audio doesn't have subtitles!
      showControls={false}
      autoPlay={true}
      loop={false}
    />
  );
}
```

### ✅ Good Example (React)

```jsx
// Segregated components with specific interfaces
function BasicPlayer({ src, autoPlay }) {
  return (
    <audio src={src} autoPlay={autoPlay} />
  );
}

function PlayerWithControls({ src, autoPlay, onPlay, onPause }) {
  return (
    <div>
      <audio src={src} autoPlay={autoPlay} />
      <button onClick={onPlay}>Play</button>
      <button onClick={onPause}>Pause</button>
    </div>
  );
}

function AdvancedVideoPlayer({ 
  src, 
  onPlay, 
  onPause,
  onVolumeChange,
  onSubtitleChange,
  subtitles
}) {
  return (
    <div>
      <video src={src} />
      {/* Advanced controls */}
    </div>
  );
}

// Or use composition with hooks
function usePlayerControls() {
  const [isPlaying, setIsPlaying] = useState(false);
  const play = () => setIsPlaying(true);
  const pause = () => setIsPlaying(false);
  return { isPlaying, play, pause };
}

function useVolumeControl() {
  const [volume, setVolume] = useState(50);
  return { volume, setVolume };
}

function CustomPlayer({ src }) {
  // Only use what you need
  const { isPlaying, play, pause } = usePlayerControls();
  
  return (
    <div>
      <audio src={src} />
      <button onClick={play}>Play</button>
      <button onClick={pause}>Pause</button>
    </div>
  );
}

function AdvancedPlayer({ src }) {
  // Use more features
  const { isPlaying, play, pause } = usePlayerControls();
  const { volume, setVolume } = useVolumeControl();
  
  return (
    <div>
      <audio src={src} />
      <button onClick={play}>Play</button>
      <button onClick={pause}>Pause</button>
      <input 
        type="range" 
        value={volume} 
        onChange={(e) => setVolume(e.target.value)} 
      />
    </div>
  );
}
```

---

## 5. Dependency Inversion Principle (DIP)

### Definition
**"High-level modules should not depend on low-level modules. Both should depend on abstractions."**

**"Abstractions should not depend on details. Details should depend on abstractions."**

### Why It Matters
- Reduces coupling between modules
- Makes code more flexible and easier to test
- Allows for easy swapping of implementations
- Promotes dependency injection

### ❌ Bad Example (JavaScript)

```javascript
// High-level module directly depends on low-level module
class MySQLDatabase {
  save(data) {
    console.log('Saving to MySQL database:', data);
    // MySQL-specific code
  }
  
  find(id) {
    console.log('Finding in MySQL database:', id);
    // MySQL-specific code
  }
}

class UserService {
  constructor() {
    // Tightly coupled to MySQL implementation
    this.database = new MySQLDatabase();
  }
  
  saveUser(user) {
    this.database.save(user);
  }
  
  getUser(id) {
    return this.database.find(id);
  }
}

// Can't easily switch to a different database
// Can't easily test without a real database
```

### ✅ Good Example (JavaScript)

```javascript
// Abstraction (interface)
class Database {
  save(data) {
    throw new Error('save() must be implemented');
  }
  
  find(id) {
    throw new Error('find() must be implemented');
  }
}

// Low-level modules implement the abstraction
class MySQLDatabase extends Database {
  save(data) {
    console.log('Saving to MySQL database:', data);
    // MySQL-specific code
  }
  
  find(id) {
    console.log('Finding in MySQL database:', id);
    return { id, name: 'User from MySQL' };
  }
}

class MongoDBDatabase extends Database {
  save(data) {
    console.log('Saving to MongoDB database:', data);
    // MongoDB-specific code
  }
  
  find(id) {
    console.log('Finding in MongoDB database:', id);
    return { id, name: 'User from MongoDB' };
  }
}

class MockDatabase extends Database {
  save(data) {
    console.log('Mock save:', data);
  }
  
  find(id) {
    return { id, name: 'Mock User' };
  }
}

// High-level module depends on abstraction
class UserService {
  constructor(database) {
    // Dependency is injected
    this.database = database;
  }
  
  saveUser(user) {
    this.database.save(user);
  }
  
  getUser(id) {
    return this.database.find(id);
  }
}

// Usage - easy to swap implementations
const mysqlService = new UserService(new MySQLDatabase());
const mongoService = new UserService(new MongoDBDatabase());
const testService = new UserService(new MockDatabase());

mysqlService.saveUser({ name: 'John' });
mongoService.saveUser({ name: 'Jane' });
testService.saveUser({ name: 'Test User' });
```

### ❌ Bad Example (React)

```jsx
// Component directly depends on fetch API
function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    // Tightly coupled to fetch and specific API endpoint
    setLoading(true);
    fetch('https://api.example.com/users')
      .then(res => res.json())
      .then(data => setUsers(data))
      .finally(() => setLoading(false));
  }, []);
  
  if (loading) return <div>Loading...</div>;
  
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

// Hard to test, hard to change data source
```

### ✅ Good Example (React)

```jsx
// Abstraction - API service interface
const apiService = {
  getUsers: async () => {
    const response = await fetch('https://api.example.com/users');
    return response.json();
  },
  
  getUser: async (id) => {
    const response = await fetch(`https://api.example.com/users/${id}`);
    return response.json();
  }
};

// Alternative implementation for testing
const mockApiService = {
  getUsers: async () => {
    return Promise.resolve([
      { id: 1, name: 'Mock User 1' },
      { id: 2, name: 'Mock User 2' }
    ]);
  },
  
  getUser: async (id) => {
    return Promise.resolve({ id, name: `Mock User ${id}` });
  }
};

// Custom hook that depends on abstraction
function useUsers(apiService) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    setLoading(true);
    apiService.getUsers()
      .then(data => setUsers(data))
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  }, [apiService]);
  
  return { users, loading, error };
}

// Component depends on abstraction through dependency injection
function UserList({ apiService }) {
  const { users, loading, error } = useUsers(apiService);
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

// Usage - easy to swap implementations
function App() {
  return (
    <div>
      <h1>Production</h1>
      <UserList apiService={apiService} />
      
      <h1>Testing</h1>
      <UserList apiService={mockApiService} />
    </div>
  );
}

// Even better: Use React Context for dependency injection
const ApiServiceContext = React.createContext(apiService);

function UserListWithContext() {
  const apiService = useContext(ApiServiceContext);
  const { users, loading, error } = useUsers(apiService);
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

function AppWithContext() {
  return (
    <ApiServiceContext.Provider value={apiService}>
      <UserListWithContext />
    </ApiServiceContext.Provider>
  );
}
```

---

## Summary

| Principle | Key Concept | Benefit |
|-----------|-------------|---------|
| **SRP** | One class/module, one responsibility | Easier to maintain and test |
| **OCP** | Open for extension, closed for modification | Add features without breaking existing code |
| **LSP** | Subtypes must be substitutable for their base types | Reliable inheritance and polymorphism |
| **ISP** | Many specific interfaces over one general | No forced dependencies on unused methods |
| **DIP** | Depend on abstractions, not concretions | Loose coupling, easy testing and swapping |

## Tips for Applying SOLID in React

1. **SRP in React:**
   - Keep components small and focused
   - Extract custom hooks for reusable logic
   - Separate business logic from presentation
   - Use composition over large components

2. **OCP in React:**
   - Use composition with props and children
   - Create wrapper components instead of modifying existing ones
   - Use Higher-Order Components (HOCs) or render props for extensibility

3. **LSP in React:**
   - Ensure component interfaces are consistent
   - Child components should honor parent component contracts
   - Avoid breaking expected prop behaviors in derived components

4. **ISP in React:**
   - Keep prop interfaces minimal
   - Use composition to combine features
   - Create specialized hooks instead of one large hook
   - Split complex components into smaller ones

5. **DIP in React:**
   - Use Context API for dependency injection
   - Pass services/APIs as props
   - Create abstraction layers for external dependencies
   - Make components testable by injecting dependencies

## Further Reading

- [Clean Code by Robert C. Martin](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882)
- [SOLID Principles of Object-Oriented Design](https://en.wikipedia.org/wiki/SOLID)
- [React Design Patterns](https://www.patterns.dev/posts/react-patterns)

---

**Remember:** SOLID principles are guidelines, not strict rules. Apply them where they make sense and improve your code, but don't force them where they add unnecessary complexity.
