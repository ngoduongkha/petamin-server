import { Body, Controller, Get, Param, ParseUUIDPipe, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/common/decorators';
import { JwtGuard } from 'src/common/guard';
import { Transaction } from 'src/database/entities';
import { TransactionService } from './transaction.service';
import { CreateTransferDto } from './dto/create-transfer.dto';

@ApiTags('transfers')
@ApiBearerAuth('access-token')
@UseGuards(JwtGuard)
@Controller('transfers')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get(':userId')
  getTransferWithUser(
    @GetUser('id') me: string,
    @Param('userId', new ParseUUIDPipe()) userId: string,
  ): Promise<Transaction[]> {
    return this.transactionService.getTransferBetween(me, userId);
  }

  @Post()
  transferPet(
    @GetUser('id') vendorId: string,
    @Body() createTransferDto: CreateTransferDto,
  ): Promise<Transaction> {
    return this.transactionService.createTransfer(vendorId, createTransferDto);
  }

  @Post(':transactionId/cancel')
  cancelTransfer(
    @GetUser('id') userId: string,
    @Param('transactionId', new ParseUUIDPipe()) transactionId: string,
  ): Promise<void> {
    return this.transactionService.cancelTransfer(userId, transactionId);
  }

  @Post(':transactionId/complete')
  completeTransfer(
    @GetUser('id') userId: string,
    @Param('transactionId', new ParseUUIDPipe()) transactionId: string,
  ): Promise<void> {
    return this.transactionService.completeTransfer(userId, transactionId);
  }
}
