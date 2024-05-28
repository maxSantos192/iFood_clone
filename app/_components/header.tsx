"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import {
  HeartIcon,
  HomeIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  ScrollTextIcon,
} from "lucide-react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "@radix-ui/react-separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { useState } from "react";

const Header = () => {
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const { data } = useSession();

  const handleSignOut = () => signOut();
  const handleSignIn = () => signIn();

  return (
    <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 pt-6">
      <div className="relative h-[40px] w-[80px]">
        <Link href={"/"}>
          <Image src="/logo.png" alt="iFood logo" fill />
        </Link>
      </div>

      <Sheet>
        <SheetTrigger asChild>
          <Button
            size="icon"
            variant="outline"
            className="border-none bg-transparent"
          >
            <MenuIcon />
          </Button>
        </SheetTrigger>

        <SheetContent className="w-[90vw]">
          <SheetHeader>
            <SheetTitle className="text-left">Menu</SheetTitle>
          </SheetHeader>

          {data?.user ? (
            <div className="flex justify-between pt-10">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={data?.user?.image as string} />
                  <AvatarFallback>
                    {data?.user?.name?.split(" ")[0][0]}
                    {data?.user?.name?.split(" ")[1][0]}
                  </AvatarFallback>
                </Avatar>

                <div>
                  <h3 className="font-semibold">{data?.user?.name}</h3>
                  <span className="block text-xs text-muted-foreground">
                    {data?.user?.email}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between pt-10">
              <h2 className="font-semibold">Olá. Faça seu login!</h2>
              <Button size={"icon"} onClick={handleSignIn}>
                <LogInIcon />
              </Button>
            </div>
          )}

          <div className="py-6">
            <Separator />

            <div className="space-y-2">
              <Button
                variant={"ghost"}
                className="font- w-full justify-start space-x-3 rounded-full text-sm"
              >
                <HomeIcon size={16} />
                <span>Inicio</span>
              </Button>

              {data?.user && (
                <>
                  <Button
                    variant={"ghost"}
                    asChild
                    className="font- w-full justify-start space-x-3 rounded-full text-sm"
                  >
                    <Link href={"/my-orders"}>
                      <ScrollTextIcon size={16} />
                      <span>Meus Pedidos</span>
                    </Link>
                  </Button>

                  <Button
                    variant={"ghost"}
                    asChild
                    className="font- w-full justify-start space-x-3 rounded-full text-sm"
                  >
                    <Link href={"/my-favorite-restaurants"}>
                      <HeartIcon size={16} />
                      <span>Restaurantes Favoritos</span>
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </div>

          <div className="py-6">
            <Separator />

            {data?.user && (
              <Button
                variant={"ghost"}
                onClick={() => setIsConfirmDialogOpen(true)}
                className="font- w-full justify-start space-x-3 rounded-full text-sm"
              >
                <LogOutIcon />
                <span>Sair da Conta</span>
              </Button>
            )}
          </div>
        </SheetContent>
      </Sheet>

      <AlertDialog
        open={isConfirmDialogOpen}
        onOpenChange={setIsConfirmDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Sair da conta</AlertDialogTitle>
            <AlertDialogDescription>
              Deseja mesmo sair da plataforma?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleSignOut}>Sair</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Header;
