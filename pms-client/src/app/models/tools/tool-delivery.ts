import { Employee } from '../hr/employee';
import { Tool } from './tool';

export class ToolDelivery {
    id: number;
    employee: Employee;
    tool: Tool;
    dateOfIssue: string;
    dateOfReturn: string;
    description: string;
}