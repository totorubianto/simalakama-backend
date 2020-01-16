import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileSchema } from './schemas/file.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'File', schema: FileSchema }])],
    providers: [FilesService],
    exports: [FilesService],
})
export class FilesModule {}
