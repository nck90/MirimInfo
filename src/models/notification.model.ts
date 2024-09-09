import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  id: string;  // 알림 ID

  @Column()
  message: string;  // 알림 메시지

  @Column()
  classId: number;  // 알림을 받은 학급 ID

  @Column()
  sentAt: Date = new Date();  // 알림 전송 시간
}
