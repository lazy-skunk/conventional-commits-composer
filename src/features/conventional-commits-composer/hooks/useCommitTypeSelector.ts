import { useEffect, useState } from "react";
import { DEFAULT_OTHER_TYPE, isOtherType, type CommitType, type OtherType } from "../domain";

export function useCommitTypeSelector(commitType: CommitType) {
  const [lastSelectedOtherType, setLastSelectedOtherType] = useState<OtherType>(DEFAULT_OTHER_TYPE);

  useEffect(() => {
    if (isOtherType(commitType)) {
      setLastSelectedOtherType(commitType);
    }
  }, [commitType]);

  return { lastSelectedOtherType };
}
