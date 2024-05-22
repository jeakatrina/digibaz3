import Container from "@/components/layouts/web/Container"
import ContentSection from "@/components/layouts/web/ContentSection"
import HeaderSection from "@/components/layouts/web/HeaderSection"
import Link from "next/link"

const page = () => {
    return (
        <Container>
            <div className="h-full py-[80px] text-primary-foreground space-y-4">

                <div className="flex flex-center mx-4 py-9 items-center justify-center bg-gradient-to-r from-violet-600 to-indigo-600 rounded-md xl:mx-0">
                    <h1 className="text-xl lg:text-2xl font-semibold">Frequenty Asked Questions</h1>
                </div>

                <ContentSection>
                    <div className="space-y-4 h-fill px-4 xl:mx-0">
                        <h2>How do I buy an Artwork or Commission?</h2>
                        <p>You can buy an Artwork or Service by:</p>
                        <ul>
                            <ol>1.) Clicking on any Artwork/Service to reach its page</ol>
                            <ol>2.) Clicking the “Contact!” button</ol>
                            <ol>3.) Chat with the Artist (through the provided platform) and tell them you want to buy</ol>
                            <ol>4.) Payment method depends on the user to artist agreement</ol>
                            <ol>5.) Provide your payment details and pay</ol>
                        </ul>
                        <br />
                        <h2>Where do I find my purchased Artwork or Commission?</h2>
                        <p>
                            Your purchased Artwork/Commission will be sent to the
                            email address associated with your account.
                        </p>
                        <br />
                        <h2>What is the difference between an Artwork and a Commission?</h2>
                        <p>
                            Artworks are already made by the selling Artists, Services
                            still have to be made according to your requests by the
                            Artists.
                        </p>
                        <br />
                        <h2>When will I receive my purchased Commission?</h2>
                        <p>
                            When the Artist has finished your Commission, it will be
                            sent to your account’s associated email address ASAP.
                            Artists are required to give you a date upon accepting a
                            request, so you can check your chat logs to see what date
                            and time were agreed upon by you and the Artist.
                            Alternatively, you can simply ask them again!
                        </p>
                        <p>
                            I have not received a Commission past the agreed date and/or time, what do I do?
                            You can easily and instantly receive a refund from this site
                            for any Commission that you have not received past the
                            agreed date and time between you and the Artist.
                            However, it is suggested that you first communicate with
                            the Artist on why you have not yet received your
                            Commission.
                        </p>
                    </div>
                </ContentSection>
                <ContentSection>
                    <div className="h-fill">
                        <h1 className="font-semibold">Still Need Help?</h1>


                        <p>You can contact us directly through {' '}
                            <span className='text-bold text-[#8889DA]'>

                                {/* change this into your email, example mailto:orenodesukouichi@gmail.com */}
                                <Link href='mailto:youremail@gmail.com'>
                                    gmail
                                </Link>
                            </span>. We reply daily from 8 AM to 5 PM.</p>
                    </div>
                </ContentSection>

            </div>
        </Container>
    )
}

export default page