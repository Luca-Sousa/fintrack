import { Link } from 'react-router';

import PasswordInput from '@/components/password-input';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const SignupPage = () => {
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
          <div className="flex gap-4">
            <Input placeholder="Digite seu nome" className="basis-1/2" />
            <Input placeholder="Digite seu sobrenome" className="basis-1/2" />
          </div>

          <Input placeholder="Digite seu e-mail" />

          <PasswordInput />
          <PasswordInput placeholder="Confirme sua senha" />

          <div className="flex items-start gap-3">
            <Checkbox id="terms1" defaultChecked />
            <Label
              htmlFor="terms1"
              className="text-xs text-muted-foreground opacity-75"
            >
              Ao clicar em &quot;Criar conta&quot;, você aceita{' '}
              <a href="#" className="text-white underline">
                nosso termo de uso e política de privacidade
              </a>
            </Label>
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
