import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import CodeCollabs from "../../../public/assets/codecollab.png"
import HeroFeature from "../../../public/assets/hero.png"
import AnalyticsAssest from "../../../public/assets/analytics.png"
import TokenAssests from "../../../public/assets/token.png"


const Features = () => {
  return (
    <div className="container py-8 p-4 md:p-8 lg:p-20 text-center  " id="features">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium">
                Easy to Use, Superior Performance
            </h2>
            <p className="mt-5 mb-10 text-lg font-normal">
                Start working with <span className="font-medium text-[#348AC7]">Logo</span> to work more efficiently.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mdlg:gap-8">
                <div>
                    <Card className="text-start">
                        <CardHeader>
                            <CardDescription>
                                <img src={AnalyticsAssest} alt="feature" className="w-20 h-20 rounded-full inline-block" />
                            </CardDescription>
                            <CardTitle>
                                Analytics Dashboard
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, aspernatur.
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <div>
                    <Card className="text-start">
                        <CardHeader>
                            <CardDescription>
                                <img src={TokenAssests} alt="feature" className="w-20 h-20 rounded-full inline-block" />
                            </CardDescription>
                            <CardTitle>
                            Analytics Dashboard
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, aspernatur.
                            </p>
                        </CardContent>
                    </Card>
                </div>
                <div className="md:col-span-2">
                    <Card className="text-start">
                        <CardHeader>
                            <CardDescription>
                                <img src={CodeCollabs} alt="feature" className="w-20 h-20 rounded-full inline-block" />
                            </CardDescription>
                            <CardTitle>
                                Code Collaboration
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col md:flex-row items-center justify-center">
                            <p className="pb-10 md:pb-0 md:pr-10">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem beatae ducimus nisi ullam quod vitae aliquam dolor esse, blanditiis autem reprehenderit consectetur dignissimos neque corporis voluptas numquam voluptates, dolore corrupti?
                               
                            </p>
                            <img src={HeroFeature} alt=""  className="w-full max-w-[400px]" />
                        </CardContent>
                    </Card>
                </div>



            </div>
        </div>
  )
}

export default Features