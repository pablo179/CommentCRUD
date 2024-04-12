import { ReactNode, useState } from "react";

export default function useLoading() {
  const [loading, setLoading] = useState(false);

  const load = async (promise: Promise<any>) => {
    setLoading(true);
    try {
      return await promise;
    } finally {
      setLoading(false);
    }
  };

  const LoadingSwitch: React.FC<{ children?: ReactNode }> = ({ children }) => {
    return loading ? <div className="loader" /> : children;
  };

  return { loading, load, LoadingSwitch };
}
