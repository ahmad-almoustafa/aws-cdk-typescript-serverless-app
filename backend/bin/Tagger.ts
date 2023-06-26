import { Aspects, IAspect } from "aws-cdk-lib";
import { Bucket, CfnBucket } from "aws-cdk-lib/aws-s3";
import { IConstruct } from "constructs";
/**
 * Aspect is a construct that allows you to traverse the construct tree and perform operations on constructs at different levels.
 * Usecases: Adding metadata/tags => check or modify resources after they have been created
 * implements => used to inherit from interface
 */
export class BucketTagger implements IAspect {
    constructor(private readonly tags: { [key: string]: string }) { }
    //IConstruct => visit any node in the construct tree that implements IConstruct regardless of of its specific type: l1,l2
    public visit(node: IConstruct): void {
        console.log('visiting: ' + node.node.id);
        if (node instanceof CfnBucket) {
            Object.keys(this.tags).forEach(key => node.tags.setTag(key, this.tags[key]));
        }
    }
}

