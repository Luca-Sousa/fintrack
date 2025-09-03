import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const SignupPage = () => {
  const [passwordIsVisible, setPasswordVisibility] = useState(false);

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-3">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-bold">Crie a sua conta</CardTitle>
          <CardDescription className="text-base font-semibold">
            Insira os seus dados abaixo.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <Input placeholder="Digite seu nome" />
          <Input placeholder="Digite seu sobrenome" />
          <Input placeholder="Digite seu e-mail" />

          <div className="relative">
            <Input
              type={passwordIsVisible ? 'text' : 'password'}
              placeholder="Digite sua senha"
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
        </CardContent>

        <CardFooter>
          <Button type="submit" className="w-full">
            Criar conta
          </Button>
        </CardFooter>
      </Card>

      <div className="flex items-center justify-center">
        <p className="text-center opacity-50">Já possui uma conta? </p>
        <Button variant="link" asChild>
          <Link to="/login">Faça login</Link>
        </Button>
      </div>
    </div>
  );
};

export default SignupPage;
