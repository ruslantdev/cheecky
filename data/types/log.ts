interface TLog {
  type?: string;
  file?: string;
  line?: number;
  column?: number;
  rule?: string;
  message?: string;
}

export default TLog;
