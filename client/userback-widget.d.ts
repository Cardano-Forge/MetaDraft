// userback-widget.d.ts

declare module "@userback/widget" {
    interface UserbackOptions {
      user_data?: {
        id?: string;
        info?: {
          name?: string;
          email?: string;
        };
      };
    }
  
    const Userback: (token: string, options?: UserbackOptions) => Promise<void>;
    export default Userback;
  }
  