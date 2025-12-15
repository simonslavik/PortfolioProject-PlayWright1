// @ts-check
import * as fs from 'fs';
import * as path from 'path';

export class Logger {
  private logDir: string;
  private logFile: string;
  private testName: string;

  constructor(testName: string = 'general') {
    this.testName = testName;
    this.logDir = path.join(process.cwd(), 'logs');
    
    // Create logs directory if it doesn't exist
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true });
    }

    // Create a log file with timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T')[0];
    this.logFile = path.join(this.logDir, `${testName}-${timestamp}.log`);
  }

  private getTimestamp(): string {
    return new Date().toISOString();
  }

  private writeLog(level: string, message: string, data?: any): void {
    const logEntry = {
      timestamp: this.getTimestamp(),
      level,
      message,
      data,
    };

    const logMessage = `[${logEntry.timestamp}] [${level}] ${message}${
      data ? ' - ' + JSON.stringify(data) : ''
    }\n`;

    // Write to file
    fs.appendFileSync(this.logFile, logMessage);

    // Also log to console
    console.log(logMessage);
  }

  info(message: string, data?: any): void {
    this.writeLog('INFO', message, data);
  }

  error(message: string, error?: any): void {
    this.writeLog('ERROR', message, error);
  }

  warn(message: string, data?: any): void {
    this.writeLog('WARN', message, data);
  }

  debug(message: string, data?: any): void {
    this.writeLog('DEBUG', message, data);
  }

  success(message: string, data?: any): void {
    this.writeLog('SUCCESS', message, data);
  }

  step(stepNumber: number, description: string): void {
    this.writeLog('STEP', `[Step ${stepNumber}] ${description}`);
  }

  testStart(testName: string): void {
    this.writeLog('TEST', `========== TEST START: ${testName} ==========`);
  }

  testEnd(testName: string, status: 'PASSED' | 'FAILED'): void {
    this.writeLog('TEST', `========== TEST END: ${testName} - ${status} ==========`);
  }

  getLogFilePath(): string {
    return this.logFile;
  }
}

export function createLogger(testName?: string): Logger {
  return new Logger(testName);
}
