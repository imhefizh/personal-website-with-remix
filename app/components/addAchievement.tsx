import { Form } from "@remix-run/react"

export default function AddAchievement() {

    return (
        <div className="md:w-[40%]">
            <Form method="post" className="">
                <p className="mt-2">Name</p>
                <input className="text-black px-1 w-full mb-2 rounded-sm" id="name" name="name" />
                <label htmlFor="img">Image Path</label>
                <input className="text-black px-1 w-full mb-2 rounded-sm" id="img" name="img" />
                <label htmlFor="url">URL</label>
                <input className="text-black px-1 w-full mb-2 rounded-sm" id="url" name="url"/>
                <label htmlFor="issuer">Issuer</label>
                <input className="text-black px-1 w-full mb-2 rounded-sm" id="issuer" name="issuer"/>
                <label htmlFor="provided_by">Provided By</label>
                <input className="text-black px-1 w-full mb-2 rounded-sm" id="provided_by" name="provided_by" />
                <button type="submit" className="border border-white rounded-md px-2 text-sm mt-2">Save to DB</button>
            </Form>
        </div>
    )
}