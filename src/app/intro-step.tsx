import React from 'react'
import { Button } from './components/ui/button'
import Link from 'next/link'

function IntroStep() {
    return (
        <section className="max-lg:py-10 lg:h-[calc(100vh-387px)]">
            <div className="container h-full bg-[url('/images/StageImage.png')] bg-no-repeat bg-contain bg-right">
                <div className='flex h-full items-center p-6'>
                    <div className='flex flex-col gap-6 w-10/12 lg:w-2/5'>
                        <h3 className='font-tagline'>WE CREATE AN ESTIMATION FOR YOU IN A FEW MINUTES</h3>
                        <h1 className='font-h1'>Turn Your ideas into reality</h1>
                        <p>With this application you can describe ideas for modules and get an estimate based on our experience.</p>
                        <Button asChild className='w-max'>
                            <Link href={"/feature-generating?step=1"}>
                                Step One
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default IntroStep
