import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from './ui/button';
import { Input } from './ui/input';

const PasswordInput = ({ placeholder = 'Digite sua senha' }) => {
  const [passwordIsVisible, setPasswordVisibility] = useState(false);

  return (
    <div className="relative">
      <Input
        type={passwordIsVisible ? 'text' : 'password'}
        placeholder={placeholder}
      />

      <Button
        variant="ghost"
        size="icon"
        className="absolute bottom-0 right-0 top-0 my-auto mr-2 size-8 text-muted-foreground"
        onClick={() => setPasswordVisibility((prev) => !prev)}
      >
        {passwordIsVisible ? <EyeOffIcon /> : <EyeIcon />}
      </Button>
    </div>
  );
};

export default PasswordInput;
