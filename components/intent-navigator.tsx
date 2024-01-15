"use client"
import * as React from "react"
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
import { RocketIcon, ZapIcon } from "lucide-react"
import { intentItems } from "@/config/site"
import { IntentItem } from "@/types"
import { getServiceByMachineName } from "@/lib/services"
import Link from "next/link"
import { Button } from "./ui/button"
import { useSession } from "next-auth/react"

export default function IntentNavigator({ triggerEnrollment }) {
    const [intent, setIntent] = React.useState<IntentItem>(intentItems.none);
    const { data: user } = useSession();

    React.useEffect(() => {
        const currentIntent = localStorage.getItem("intent");
        if (currentIntent) {
            setIntent(intentItems[currentIntent]);
        }
    }, [])

    const currentService = getServiceByMachineName(intent.machine_name);
    const payload = {
        service_id: intent.program_id,
        program_id: intent.service_id,
        mentor_id: intent.mentor_id,
        status: intent.status,
    }

    return (
        <>
            {currentService && intent.machine_name !== "none" && (
                <Alert>
                    <RocketIcon className="h-4 w-4" />
                    <AlertTitle>{currentService.title}</AlertTitle>
                    <AlertDescription>
                        <br />
                        {intent.description}
                        <br />
                        {intent.action === 'link' && (
                            <Link href={intent.url}>
                                <Button className="my-4">
                                    {intent.actionLabel}
                                </Button>
                            </Link>
                        )}

                        {intent.action === 'buy' && (
                            <Button className="my-4" onClick={() => {
                                triggerEnrollment(payload, true);
                            }}>
                                {intent.actionLabel}
                            </Button>
                        )}
                    </AlertDescription>
                </Alert>
            )}


            {currentService && intent.machine_name === "kids" && (
                <Alert variant="destructive">
                    <ZapIcon className="h-4 w-4" />
                    <AlertTitle>ყურადღება!</AlertTitle>
                    <AlertDescription>
                        <div className="text-white">
                        <br />
                        BitCamp Kids - ის საბავშვო პროგრამაში გაკვეთლების ჩატარების სტანდარტული დრო არის საღამოს 4 საათი (16:00). ორშაბათს, ოთხშაბათს და პარასკევს.
                        <br />
                        <br />
                        თუმცა თუ ვერ მოახერხებთ ასეთ დროს გაკვეთილებზე დასწრებას, გთხოვთ მოგვწეროთ თქვენთვის სასურველი დროები ჩვენს Facebook გვერდზე და თუ საკმარისი რაოდენობის მოსწავლეები მოგროვდებიან თქვენთვის სასურველ დროს, გავხსნით ახალ ჯგუფებს 🙏
                        <br />
                        <br />

                        <Link href="https://www.facebook.com/bitcamp.ge" target="_blank">
                            <Button variant="destructive" className="my-4">
                                Facebook გვერდი
                            </Button>
                        </Link>
                        </div>

                    </AlertDescription>
                </Alert>
            )}
        </>
    )
}   