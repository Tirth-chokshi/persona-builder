import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
export default function Dashboard() {
  return (
    <>
      <Sheet>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Edit profile</SheetTitle>
            <SheetDescription>
              Make changes to your profile here. Click save when you're done.
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" value="Pedro Duarte" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <Input id="username" value="@peduarte" className="col-span-3" />
            </div>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit">Save changes</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
        {/* ///////////////////////////////////// */}
      <div className="flex flex-col w-full h-full items-center justify-start">
      <h1 className="max-w-[900px] w-full text-3xl font-semibold m-[30px]">
        Create Persona
      </h1>
        <div className="flex w-full h-auto items-center justify-center">
          <Input
            className="max-w-[600px] w-[90%] h-[40px]"
            type="email"
            placeholder="Search company or individual..."
          />
          <Button className="ml-[10px] h-[40px] w-[100px]" variant="outline">Search</Button>
          <SheetTrigger asChild>
            <Button className="ml-[10px] h-[40px] w-[100px]" variant="secondary">Filter</Button>
          </SheetTrigger>
        </div>
      </div>
      {/* ////////////////////// */}
      </Sheet>
    </>
  );
}
