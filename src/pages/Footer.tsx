import { HeartPulse, Facebook, Youtube, Twitter, Github, Phone, Mail, MapPin } from 'lucide-react';


export default function Footer() {
  return (
<footer >
  <div className="fixed bottom-0 right-0 left-0  bg-[#05162C] text-white">
  <div className="mx-auto max-w-screen-xl  px-4 py-16 sm:px-6 lg:px-8">
    <div className="md:flex lg:gap-40 justify-between">
      <div className='pb-5 md:pb-0'> 
        <div className="flex gap-2"><HeartPulse className='w-12 h-12'/><h1 className='text-3xl'>cure</h1></div>
        <p className="mt-4 max-w-xs text-lg">
          Cure helps you find trusted doctors, book appointments, and manage your health—quickly and easily.
        </p>

        <ul className="mt-8 flex gap-6">
            <li className='bg-white p-1 rounded'> <a href="#"><Facebook className='text-blue-600 w-5'/></a></li>
            <li className='bg-white p-1 rounded'> <a href="#"><Youtube className='text-red-600 w-5'/></a></li>
            <li className='bg-white p-1 rounded'> <a href="#"><Github  className='text-black w-5'/></a></li>
            <li className='bg-white p-1 rounded'> <a href="#"><Twitter className='text-blue-600 w-5'/></a></li>
        </ul>
      </div>

      <div className="grid grid-cols-1  sm:grid-cols-2 lg:col-span-2 lg:grid-cols-3">
        <div >
          <p className="font-medium ">Company</p>

          <ul className="mt-6 space-y-4 text-sm">
            <li>
              <a href="#" className=" transition hover:opacity-75"> Home </a>
            </li>

            <li>
              <a href="#" className=" transition hover:opacity-75"> Doctor </a>
            </li>

            <li>
              <a href="#" className=" transition hover:opacity-75"> FAQs </a>
            </li>

            <li>
              <a href="#" className=" transition hover:opacity-75"> Contact Us </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="font-medium ">Support</p>

          <ul className="mt-6 space-y-4 text-sm">
            <li>
              <a href="#" className=" transition hover:opacity-75"> Help center </a>
            </li>

            <li>
              <a href="#" className=" transition hover:opacity-75"> How it works </a>
            </li>

            <li>
              <a href="#" className=" transition hover:opacity-75"> Privacy Policy </a>
            </li>

            <li>
              <a href="#" className=" transition hover:opacity-75"> Terms & Conditions </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="font-medium ">Contact Info</p>

          <ul className="mt-6 space-y-4 text-sm">
            <li className='flex items-center gap-2'>
              <Phone className='w-5 text-gray-400'/>
              <div className="">
                <p>Phone</p>
                <span>080 707 555-321</span>
              </div>
            </li>

            <li className='flex items-center gap-2'>
              <Mail className='w-5 text-gray-400'/>
              <div className="">
                <p>Email</p>
                <span>demo@example.com</span>
              </div>
            </li>

            <li className='flex items-center gap-2'>
              <MapPin className='w-5 text-gray-400'/>
              <div className="">
                <p>Address</p>
                <span>526 Melrose Street,Water Mill, 11976 New York</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    
    <div className="flex justify-between ">
      <p >@2024 Techvio - All Right Reserved</p>
      <p>Terms & Condition | Privacy Policy</p>
  </div>
    </div>
    </div>
</footer>


  )
}
