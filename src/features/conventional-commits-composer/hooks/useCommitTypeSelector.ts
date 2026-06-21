import { useState } from "react";
import {
  DEFAULT_OTHER_TYPE,
  isOtherType,
  type CommitType,
  type OtherType,
} from "../domain";

export function useCommitTypeSelector(commitType: CommitType) {
  const [lastSelectedOtherType, setLastSelectedOtherType] =
    useState<OtherType>(DEFAULT_OTHER_TYPE);
  const selectedOtherType = isOtherType(commitType)
    ? commitType
    : lastSelectedOtherType;

  return {
    lastSelectedOtherType: selectedOtherType,
    setLastSelectedOtherType,
  };
}
