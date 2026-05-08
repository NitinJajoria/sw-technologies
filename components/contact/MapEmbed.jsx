export default function MapEmbed() {
  return (
    <div className="w-full h-[450px] rounded-[32px] overflow-hidden border border-white/5 shadow-2xl relative">
      <iframe
        title="SW Technologies Location"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.9765882088754!2d77.20890931557929!3d28.632734882414626!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cffd9c97a67a1%3A0x9e29e26ce57b4e55!2sConnaught%20Place%2C%20New%20Delhi!5e0!3m2!1sen!2sin!4v1620000000000"
        width="100%"
        height="100%"
        style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
