import { Button } from './components/ui/button';

const App = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold text-red-500">Welcome to FinTrack</h1>
      <p className="mt-2 text-lg text-red-900">
        Your one-stop solution for financial tracking.
      </p>

      <Button>Get Started</Button>
    </div>
  );
};

export default App;
