import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

type ScanInput = {
  email: string;
  domain: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const domainPattern = /^([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;

// Common fake/test emails and domains to reject
const fakeEmails = [
  'test@test.com',
  'fake@fake.com',
  'example@example.com',
  'user@user.com',
  'admin@admin.com',
  'test@gmail.com',
  'fake@gmail.com',
  'asdf@asdf.com',
  'qwerty@qwerty.com',
  '123@123.com',
  'abc@abc.com'
];

const fakeDomains = [
  'test.com',
  'fake.com',
  'example.com',
  'user.com',
  'admin.com',
  'asdf.com',
  'qwerty.com',
  '123.com',
  'abc.com'
];

// Function to validate if email/domain is likely real
function validateRealInput(value: string, type: 'email' | 'domain'): boolean {
  const lowerValue = value.toLowerCase();
  
  if (type === 'email') {
    // Check against fake email list
    if (fakeEmails.includes(lowerValue)) {
      return false;
    }
    
    // Check if domain part is fake
    const domainPart = lowerValue.split('@')[1];
    if (fakeDomains.includes(domainPart)) {
      return false;
    }
    
    // Additional checks for obviously fake patterns
    if (lowerValue.includes('test') || lowerValue.includes('fake') || lowerValue.includes('example')) {
      return false;
    }
  } else {
    // Check against fake domain list
    if (fakeDomains.includes(lowerValue)) {
      return false;
    }
    
    // Additional checks for obviously fake patterns
    if (lowerValue.includes('test') || lowerValue.includes('fake') || lowerValue.includes('example')) {
      return false;
    }
  }
  
  return true;
}

const ScanForm = () => {
  const [input, setInput] = useState<ScanInput>({ email: "", domain: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.email && !input.domain) {
      toast({ title: "Please enter an email or a domain", description: "One field must be filled!", variant: "destructive" });
      return;
    }
    setLoading(true);

    let scanType: "email" | "domain";
    let value: string;

    if (input.email) {
      if (!emailPattern.test(input.email)) {
        toast({ title: "Invalid email address", description: "Please enter a valid email address", variant: "destructive" });
        setLoading(false);
        return;
      }
      
      // Check if email is fake/test
      if (!validateRealInput(input.email, 'email')) {
        toast({ 
          title: "Invalid email detected", 
          description: "Please enter a real email address, not a test or fake one", 
          variant: "destructive" 
        });
        setLoading(false);
        return;
      }
      
      scanType = "email";
      value = input.email;
    } else {
      if (!domainPattern.test(input.domain)) {
        toast({ title: "Invalid domain format", description: "Please enter a valid domain (e.g., company.com)", variant: "destructive" });
        setLoading(false);
        return;
      }
      
      // Check if domain is fake/test
      if (!validateRealInput(input.domain, 'domain')) {
        toast({ 
          title: "Invalid domain detected", 
          description: "Please enter a real domain, not a test or fake one", 
          variant: "destructive" 
        });
        setLoading(false);
        return;
      }
      
      scanType = "domain";
      value = input.domain;
    }

    // Simulate API request with additional server-side validation
    setTimeout(() => {
      // Simulate scan ID
      const fakeScanId = btoa(value).slice(0, 8);
      navigate(`/result/${fakeScanId}?type=${scanType}&value=${encodeURIComponent(value)}`);
    }, 1300);
  }

  return (
    <form
      className="flex flex-col gap-5 w-full max-w-xl mx-auto p-8 rounded-2xl bg-[#19202b] border border-[#233040] shadow-xl mt-6"
      onSubmit={handleSubmit}
    >
      <label className="block text-gray-300 uppercase tracking-wider text-xs mb-1 font-semibold">
        Your Email <span className="text-muted-foreground normal-case">(or leave blank)</span>
      </label>
      <input
        className="bg-[#131926] border border-gray-600 px-4 py-3 rounded-lg mb-4 text-white font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
        type="email"
        name="email"
        placeholder="user@company.com"
        value={input.email}
        autoComplete="off"
        onChange={handleInput}
        disabled={!!input.domain || loading}
        spellCheck={false}
      />
      <label className="block text-gray-300 uppercase tracking-wider text-xs mb-1 font-semibold">
        Business Domain <span className="text-muted-foreground normal-case">(or leave blank)</span>
      </label>
      <input
        className="bg-[#131926] border border-gray-600 px-4 py-3 rounded-lg mb-2 text-white font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
        type="text"
        name="domain"
        placeholder="company.com"
        value={input.domain}
        autoComplete="off"
        onChange={handleInput}
        disabled={!!input.email || loading}
        spellCheck={false}
      />
      <button
        className="mt-4 bg-blue-600 text-white font-bold py-3 px-8 rounded-lg uppercase tracking-wider shadow-lg hover:bg-blue-700 transition-colors duration-200 text-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#19202b] focus:ring-blue-500 disabled:bg-gray-500 disabled:cursor-not-allowed"
        type="submit"
        disabled={loading || (!input.email && !input.domain)}
      >
        {loading ? "Scanning..." : "Scan Now"}
      </button>
      <div className="text-xs text-muted-foreground text-center mt-2">* No data is ever stored. 100% private & real-time.</div>
    </form>
  );
};

export default ScanForm;
