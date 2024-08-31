'use client';
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useRouter } from 'next/navigation';
import { useSession, signIn, signOut } from "next-auth/react"


export default function Component() {
    const { data: session } = useSession()
    if (session) {

        const router = useRouter();
          router.push('/home/builder');

        return (
            <>
                {/* <button onClick={() => signOut()}>Sign out</button> */}
                <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
                    <div className="hidden bg-muted lg:block">
                        <Image
                            src="/images/loginBack.png"
                            alt="Image"
                            width="2000"
                            height="1500"
                            className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                        />
                    </div>
                    <div className="flex items-center justify-center py-12">
                        <div className="mx-auto grid w-[350px] gap-6">
                            <div className="grid gap-2 text-left">
                                <h1 className="text-5xl font-bold">Login</h1>
                                <p className="text-balance text-muted-foreground">
                                    Welcome to persona-builder Signed in as {session.user.email}
                                </p>
                            </div>
                            <div className="grid gap-4">
                                <Button variant="destructive" className="w-full" onClick={() => signOut()}>
                                    Sign out
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
    return (
        <>
            {/* Not signed in <br />
            <button onClick={() => signIn()}>Sign in</button> */}
            <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
                <div className="hidden bg-muted lg:block">
                    <Image
                        src="/images/loginBack.png"
                        alt="Image"
                        width="2000"
                        height="1500"
                        className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                    />
                </div>
                <div className="flex items-center justify-center py-12">
                    <div className="mx-auto grid w-[350px] gap-6">
                        <div className="grid gap-2 text-left">
                            <h1 className="text-5xl font-bold">Login</h1>
                            <p className="text-balance text-muted-foreground">
                                Welcome to persona-builder
                            </p>
                        </div>
                        <div className="grid gap-4">
                            <Button variant="outline" className="w-full" onClick={() => signIn('google')}>
                                Continue with Google
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}