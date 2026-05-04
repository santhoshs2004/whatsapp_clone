const EmptyChat = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-wa-darker-bg chat-wallpaper">
      <div className="text-center fade-in max-w-md px-6">
        {/* Illustration */}
        <div className="w-72 h-72 mx-auto mb-8 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-48 h-48 rounded-full bg-wa-teal/5 flex items-center justify-center">
              <div className="w-32 h-32 rounded-full bg-wa-teal/10 flex items-center justify-center">
                <svg viewBox="0 0 303 172" className="w-24 h-24 text-wa-teal/40 fill-current">
                  <path d="M229.565 160.23c-6.608 6.575-16.475 8.675-25.283 5.382-3.32-1.242-6.293-3.28-8.76-5.777a36.449 36.449 0 01-3.715-4.55c-3.283-4.767-5.206-10.338-5.48-16.17-.254-5.416.84-10.95 3.308-15.803.754-1.483 1.63-2.902 2.618-4.242a37.015 37.015 0 014.97-5.233c4.165-3.517 9.254-5.848 14.608-6.775 5.351-.926 10.932-.395 15.98 1.554 10.49 4.052 17.82 14.358 18.38 25.53.302 6.02-1.334 12.142-4.673 17.142a36.156 36.156 0 01-5.43 6.61 36.32 36.32 0 01-6.523 5.332z" opacity=".08"/>
                  <path d="M158.572 131.399c-5.937 5.916-14.814 7.808-22.743 4.845-2.99-1.12-5.664-2.954-7.884-5.2a32.908 32.908 0 01-3.343-4.099c-2.954-4.293-4.686-9.31-4.933-14.573-.228-4.879.756-9.864 2.978-14.237a31.99 31.99 0 012.356-3.821 33.3 33.3 0 014.474-4.714c3.749-3.168 8.33-5.265 13.148-6.1 4.815-.835 9.841-.357 14.382 1.4 9.44 3.65 16.04 12.93 16.545 23.007.271 5.42-1.201 10.937-4.206 15.441a32.564 32.564 0 01-4.888 5.954 32.7 32.7 0 01-5.886 4.797z" opacity=".12"/>
                  <path d="M87.14 103.687c-5.268 5.25-13.147 6.93-20.178 4.3-2.652-.993-5.025-2.62-6.996-4.613a29.21 29.21 0 01-2.966-3.639c-2.62-3.81-4.157-8.262-4.376-12.934-.203-4.33.67-8.755 2.642-12.637a28.373 28.373 0 012.09-3.393 29.566 29.566 0 013.97-4.184c3.326-2.812 7.394-4.674 11.669-5.416 4.274-.742 8.734-.317 12.766 1.242 8.377 3.24 14.233 11.475 14.68 20.42.241 4.813-1.066 9.707-3.732 13.706a28.9 28.9 0 01-4.338 5.287 29.03 29.03 0 01-5.23 4.261z" opacity=".16"/>
                </svg>
              </div>
            </div>
          </div>
          {/* Animated ring */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-60 h-60 rounded-full border border-wa-teal/10 animate-pulse"></div>
          </div>
        </div>

        <h2 className="text-3xl font-light text-wa-text-primary mb-3">
          WhatsApp Web
        </h2>
        <p className="text-wa-text-secondary text-sm leading-relaxed mb-6">
          Send and receive messages without keeping your phone online.
          <br />
          Use WhatsApp on up to 4 linked devices and 1 phone at the same time.
        </p>

        <div className="flex items-center justify-center gap-2 text-wa-text-secondary/50 text-xs">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          End-to-end encrypted
        </div>
      </div>
    </div>
  );
};

export default EmptyChat;
