import {Component, Input} from '@angular/core';
import {Track} from '../../../tracks/models/track.model';
import {Tracks} from '../../../tracks/collections/tracks.collection';
import {PlayQueue} from '../../../audioplayer/collections/play_queue.collection';
import {PlayQueueItem} from '../../../audioplayer/models/play_queue_item.model';

@Component({
  selector: 'queue-button',
  styles: [ require('./queue_button.style.scss') ],
  template: require('./queue_button.template.html')
})

export class QueueButtonComponent {

  @Input() track: Track;

  @Input() tracks: Tracks<Track>;

  private playQueue: PlayQueue<PlayQueueItem> = PlayQueue.getInstance();

  isQueued(): boolean {
    let queuedItems = this.playQueue.getQueuedItems();
    if (queuedItems && queuedItems.find((item: PlayQueueItem) => {
        return item.get('track').get('id') === this.track.id;
      })) {
      return true;
    } else {
      return false;
    }
  }

  queue(): void {
    this.playQueue.queue({track: this.track});
  }
}